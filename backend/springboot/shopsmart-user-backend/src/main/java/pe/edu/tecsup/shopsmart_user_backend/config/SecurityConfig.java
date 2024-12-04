package pe.edu.tecsup.shopsmart_user_backend.config;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import pe.edu.tecsup.shopsmart_user_backend.models.Token;
import pe.edu.tecsup.shopsmart_user_backend.repositories.TokenRepository;
import pe.edu.tecsup.shopsmart_user_backend.services.CookieService;

import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final TokenRepository tokenRepository;
    private final AuthenticationProvider authenticationProvider;
    private final CookieService cookieService;
    @Bean
    public SecurityFilterChain securityFilterChain(final HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(req ->
                        req.requestMatchers("/auth/**", "/h2-console/**", "/**")
                                .permitAll()
                                .anyRequest()
                                .authenticated()
                )
                .sessionManagement(session -> session.sessionCreationPolicy(STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class) // Filtro JWT
                .logout(logout ->
                        logout.logoutUrl("/auth/logout")
                                .addLogoutHandler(this::logout) // Manejo de logout
                                .logoutSuccessHandler((request, response, authentication) -> SecurityContextHolder.clearContext())
                )
                .headers(headers ->
                        headers
                                .frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin)
                ) // Permitir frames desde el mismo origen
        ;

        return http.build();
    }

    private void logout(
            final HttpServletRequest request, final HttpServletResponse response,
            final Authentication authentication
    ) {
        // Obtener el token desde las cookies en lugar de los encabezados
        final String jwt = cookieService.getCookieValue(request, "jwt_token");
        if (jwt == null) {
            return;
        }

        final Token storedToken = tokenRepository.findByToken(jwt)
                .orElse(null);
        if (storedToken != null) {
            storedToken.setIsExpired(true);
            storedToken.setIsRevoked(true);
            tokenRepository.save(storedToken);
            SecurityContextHolder.clearContext();
        }
    }


}
