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
        if (request.getServletPath().contains("/api/v1/auth")) {
            filterChain.doFilter(request, response);
            return;
        }


        final String jwt = cookieService.getCookieValue(request, "jwt_token");

        if (jwt==null || jwt.isEmpty()){
            filterChain.doFilter(request, response);
            return;
        }


        final String userEmail = jwtService.extractUsername(jwt);
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (userEmail == null || authentication != null) {
            filterChain.doFilter(request, response);
            return;
        }
        final Optional<User> user = userRepository.findByEmail(userEmail);

        if (user.isPresent()) {

            final UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
            final boolean isTokenExpiredOrRevoked = tokenRepository.findByToken(jwt)
                    .map(token -> token.getIsExpired() || token.getIsRevoked())
                    .orElse(false);


            if (!isTokenExpiredOrRevoked) {
                final boolean isTokenValid = jwtService.isTokenValid(jwt, user.get());

                if (isTokenValid) {
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                    );
                    authToken.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(request)
                    );
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }

            }
        }

        filterChain.doFilter(request, response);
    }
}
