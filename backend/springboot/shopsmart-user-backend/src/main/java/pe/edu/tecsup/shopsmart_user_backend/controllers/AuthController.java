package pe.edu.tecsup.shopsmart_user_backend.controllers;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.tecsup.shopsmart_user_backend.dto.LoginRequest;
import pe.edu.tecsup.shopsmart_user_backend.dto.RegisterRequest;
import pe.edu.tecsup.shopsmart_user_backend.dto.TokenResponse;
import pe.edu.tecsup.shopsmart_user_backend.services.AuthService;
import pe.edu.tecsup.shopsmart_user_backend.services.CookieService;
import pe.edu.tecsup.shopsmart_user_backend.services.JwtService;

import static pe.edu.tecsup.shopsmart_user_backend.services.CookieService.JWT_TOKEN;
import static pe.edu.tecsup.shopsmart_user_backend.services.CookieService.REFRESH_TOKEN;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final CookieService cookieService;
    private final JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody final RegisterRequest request, HttpServletResponse response){
        final TokenResponse tokenResponse = authService.register(request);

        Cookie jwtCookie = cookieService.createJwtCookie(tokenResponse.accessToken());
        Cookie refreshTokenCookie = cookieService.createRefreshTokenCookie(tokenResponse.refreshToken());
        response.addCookie(jwtCookie);
        response.addCookie(refreshTokenCookie);
        return ResponseEntity.ok().build();
    }
    @PostMapping("/login")
    public ResponseEntity<Void> login(@RequestBody final LoginRequest request, HttpServletResponse response){
        final TokenResponse tokenResponse = authService.login(request);

        Cookie jwtCookie = cookieService.createJwtCookie(tokenResponse.accessToken());
        Cookie refreshTokenCookie = cookieService.createRefreshTokenCookie(tokenResponse.refreshToken());
        response.addCookie(jwtCookie);
        response.addCookie(refreshTokenCookie);
        return ResponseEntity.ok()
                .build();
    }

    @GetMapping("/validate-token")
    public ResponseEntity<Void> validateToken(HttpServletRequest request) {
        String jwtToken = cookieService.getCookieValue(request, JWT_TOKEN);
        if (jwtToken == null || jwtService.isTokenExpired(jwtToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok().build();
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<String> refreshToken(HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = cookieService.getCookieValue(request, REFRESH_TOKEN);
        if (refreshToken == null || !jwtService.isTokenExpired(refreshToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        TokenResponse tokens = authService.refreshToken(refreshToken);

        String newJwtToken = tokens.accessToken();
        Cookie jwtCookie = cookieService.createJwtCookie(newJwtToken);
        response.addCookie(jwtCookie);
        return ResponseEntity.ok().build();
    }
}
