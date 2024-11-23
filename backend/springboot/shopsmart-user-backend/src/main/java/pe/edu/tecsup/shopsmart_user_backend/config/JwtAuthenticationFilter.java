package pe.edu.tecsup.shopsmart_user_backend.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import pe.edu.tecsup.shopsmart_user_backend.models.User;
import pe.edu.tecsup.shopsmart_user_backend.repositories.TokenRepository;
import pe.edu.tecsup.shopsmart_user_backend.repositories.UserRepository;
import pe.edu.tecsup.shopsmart_user_backend.services.CookieService;
import pe.edu.tecsup.shopsmart_user_backend.services.JwtService;

import java.io.IOException;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    private final TokenRepository tokenRepository;
    private final UserRepository userRepository;
    private final CookieService cookieService;
    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        // No filtrar solicitudes que no son de autenticación
        if (request.getServletPath().contains("/api/v1/auth")) {
            filterChain.doFilter(request, response);
            return;
        }

        // Obtener el token desde las cookies
        final String jwt = cookieService.getCookieValue(request, "jwt_token");
        if (jwt == null) {
            filterChain.doFilter(request, response);
            return;
        }

        // Extraer el nombre del usuario del token
        final String userEmail = jwtService.extractUsername(jwt);
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // Si el usuario ya está autenticado o no se pudo extraer el email, proceder sin hacer nada
        if (userEmail == null || authentication != null) {
            filterChain.doFilter(request, response);
            return;
        }

        // Cargar detalles del usuario
        final UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);

        // Comprobar si el token no está expirado ni revocado
        final boolean isTokenExpiredOrRevoked = tokenRepository.findByToken(jwt)
                .map(token -> !token.getIsExpired() && !token.getIsRevoked())
                .orElse(false);

        if (isTokenExpiredOrRevoked) {
            // Si el token es válido, establecer la autenticación
            final Optional<User> user = userRepository.findByEmail(userEmail);
            if (user.isPresent()) {
                final boolean isTokenValid = jwtService.isTokenValid(jwt);

                if (isTokenValid) {
                    // Crear un objeto de autenticación para el usuario
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                    );
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    // Establecer la autenticación en el contexto de seguridad
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
        }

        // Continuar con el filtro
        filterChain.doFilter(request, response);
    }

}
