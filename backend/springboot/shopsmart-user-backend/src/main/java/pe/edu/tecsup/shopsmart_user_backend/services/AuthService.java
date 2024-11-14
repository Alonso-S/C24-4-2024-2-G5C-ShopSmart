package pe.edu.tecsup.shopsmart_user_backend.services;

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
import pe.edu.tecsup.shopsmart_user_backend.repositories.UserRepository;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public TokenResponse register(RegisterRequest request){
        User user = User.builder()
                .firstName(request.firstName())
                .lastName(request.lastName())
                .birthdate(request.birthdate())
                .phone(request.phone())
                .city(request.city())
                .state(request.state())
                .country(request.country())
                .address(request.address())
                .username(request.username())
                .email(request.email())
                .password(passwordEncoder.encode(request.password())).build();

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




    private void saveUserToken(User user, String jwtToken){
        Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(Token.TokenType.BEARER)
                .isExpired(false)
                .isRevoked(false)
                .build();
    }
}
