package pe.edu.tecsup.shopsmart_user_backend.services;

import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pe.edu.tecsup.shopsmart_user_backend.dtos.auth.LoginRequest;
import pe.edu.tecsup.shopsmart_user_backend.dtos.auth.RegisterRequest;
import pe.edu.tecsup.shopsmart_user_backend.dtos.auth.TokenResponse;
import pe.edu.tecsup.shopsmart_user_backend.models.RefreshToken;
import pe.edu.tecsup.shopsmart_user_backend.models.User;
import pe.edu.tecsup.shopsmart_user_backend.repositories.TokenRepository;
import pe.edu.tecsup.shopsmart_user_backend.repositories.UserRepository;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final TokenRepository tokenRepository;
    private final AuthenticationManager authenticationManager;

    public TokenResponse register(RegisterRequest request){
        User user = User.builder()
                .name(request.name())
                .phone(request.phone())
                .address(request.address())
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .province(request.province())
                .district(request.district())
                .role("USER")
                .build();

        User savedUser = userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        saveUserToken(savedUser, refreshToken);
        return new TokenResponse(jwtToken, refreshToken);
    }

    public TokenResponse login(LoginRequest request){

        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        request.email(),
                        request.password()
        );
        authenticationManager.authenticate(authToken);

        User user = userRepository.findByEmail(request.email()).orElseThrow(
                ()-> new UsernameNotFoundException("User not found"));

        String jwtToken = jwtService.generateToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);
        saveUserToken(user, refreshToken);
        return new TokenResponse(jwtToken, refreshToken);
    }

    public String refreshToken(@NotNull final String refreshToken){

        final boolean isTokenExpired = jwtService.isTokenExpired(refreshToken);
        if (isTokenExpired) {
            return null;
        }
        final String userEmail= jwtService.extractUsername(refreshToken);
        User user = userRepository.findByEmail(userEmail).orElseThrow(
                ()-> new UsernameNotFoundException("User not found")
        );


        final String newAccessToken = jwtService.generateRefreshToken(user);

        saveUserToken(user, newAccessToken);
        return newAccessToken;
    }




    private void saveUserToken(User user, String jwtToken){
        final RefreshToken refreshToken = RefreshToken.builder()
                .user(user)
                .token(jwtToken)
                .isExpired(false)
                .isRevoked(false)
                .build();
        tokenRepository.save(refreshToken);
    }
}
