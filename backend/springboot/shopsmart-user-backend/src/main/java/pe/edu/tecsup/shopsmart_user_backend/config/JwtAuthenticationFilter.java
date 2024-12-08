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
        logger.info("Trace 1");
        if (request.getServletPath().contains("/auth")) {
            filterChain.doFilter(request, response);
            logger.info("Trace 2");

            return;
        }

        logger.info("Trace 3");

        final String jwt = cookieService.getCookieValue(request, "jwt_token");
        if (jwt == null) {
            logger.info("Trace 4");

            filterChain.doFilter(request, response);
            return;
        }
        logger.info("Trace 5");

        final String userEmail = jwtService.extractUsername(jwt);
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        logger.info("Trace 6: " + authentication);

        if (userEmail == null || authentication != null) {
            filterChain.doFilter(request, response);
            logger.info("Trace 7");

            return;
        }
        logger.info("Trace 8");


        final UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);

        final boolean isTokenExpiredOrRevoked = tokenRepository.findByToken(jwt)
                .map(token -> !token.getIsExpired() && !token.getIsRevoked())
                .orElse(false);
        logger.info("Trace 9"+ isTokenExpiredOrRevoked);

        if (isTokenExpiredOrRevoked) {
            filterChain.doFilter(request, response);
            return;
        }

        logger.info("Trace 10");

        final Optional<User> user = userRepository.findByEmail(userEmail);
        if (user.isPresent()) {
            final boolean isTokenValid = jwtService.isTokenValid(jwt);
                if (isTokenValid) {
                    logger.info("Trace 11");

                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                    );
                    logger.info("Trace 12: "+ authToken);

                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
        filterChain.doFilter(request, response);

        }



}
