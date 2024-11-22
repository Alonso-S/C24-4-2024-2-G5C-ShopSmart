package pe.edu.tecsup.shopsmart_user_backend.services;

import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pe.edu.tecsup.shopsmart_user_backend.dto.LoginRequest;
import pe.edu.tecsup.shopsmart_user_backend.dto.RegisterRequest;
import pe.edu.tecsup.shopsmart_user_backend.dto.TokenResponse;
import pe.edu.tecsup.shopsmart_user_backend.models.Token;
import pe.edu.tecsup.shopsmart_user_backend.models.User;
import pe.edu.tecsup.shopsmart_user_backend.repositories.TokenRepository;
import pe.edu.tecsup.shopsmart_user_backend.repositories.UserRepository;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final TokenRepository tokenRepository;

    public TokenResponse register(RegisterRequest request){
        User user = User.builder()
                .name(request.name())
                .phone(request.phone())
                .address(request.address())
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .province(request.province())
                .district(request.district())
                .build();

        User savedUser = userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        saveUserToken(savedUser, jwtToken);
        return new TokenResponse(jwtToken, refreshToken);
    }

    public TokenResponse login(LoginRequest request){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.email(),
                        request.password()
                )
        );

        User user = userRepository.findByEmail(request.email()).orElseThrow(
                ()-> new UsernameNotFoundException("User not found"));

        String jwtToken = jwtService.generateToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);

        return new TokenResponse(jwtToken, refreshToken);
    }

    public TokenResponse refreshToken(@NotNull final String authentication){
        if (!authentication.startsWith("Bearer ")) {
            throw new IllegalArgumentException("Invalid auth header");
        }
        final String refreshToken = authentication.substring(7);
        final String userEmail= jwtService.extractUsername(refreshToken);
        User user = userRepository.findByEmail(userEmail).orElseThrow(
                ()-> new UsernameNotFoundException("User not found")
        );
        final boolean isTokenValid = jwtService.isTokenValid(refreshToken, user);
        if (!isTokenValid) {
            return null;
        }

        final String accessToken = jwtService.generateRefreshToken(user);
        saveUserToken(user, accessToken);
        return  new TokenResponse(accessToken, refreshToken);
    }


    private void saveUserToken(User user, String jwtToken){
        final Token token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(Token.TokenType.BEARER)
                .isExpired(false)
                .isRevoked(false)
                .build();
        tokenRepository.save(token);
    }
}
