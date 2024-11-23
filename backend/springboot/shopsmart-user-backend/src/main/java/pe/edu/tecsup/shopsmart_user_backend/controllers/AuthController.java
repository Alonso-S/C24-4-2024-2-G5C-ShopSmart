package pe.edu.tecsup.shopsmart_user_backend.controllers;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
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
    private final JwtService jwtService;
    private final CookieService cookieService;

    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody final RegisterRequest request){
        final TokenResponse tokenResponse = authService.register(request);

        ResponseCookie jwtCookie = cookieService.createJwtCookie(tokenResponse.accessToken());
        ResponseCookie refreshTokenCookie = cookieService.createRefreshTokenCookie(tokenResponse.refreshToken());

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .header(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString())
                .build();
    }

    @PostMapping("/login")
    public ResponseEntity<Void> login(@RequestBody final LoginRequest request){
        final TokenResponse tokenResponse = authService.login(request);

        ResponseCookie jwtCookie = cookieService.createJwtCookie(tokenResponse.accessToken());
        ResponseCookie refreshTokenCookie = cookieService.createRefreshTokenCookie(tokenResponse.refreshToken());

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .header(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString())
                .build();
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<String> refreshToken(HttpServletRequest request) {
        String refreshToken = cookieService.getCookieValue(request, REFRESH_TOKEN);
        if (refreshToken == null || !jwtService.isTokenValid(refreshToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String newJwtToken = authService.refreshToken(refreshToken);
        ResponseCookie cookie = cookieService.createJwtCookie(newJwtToken);
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString()).build();
    }

    @GetMapping("/validate-token")
    public ResponseEntity<Void> validateToken(HttpServletRequest request) {
        String jwtToken = cookieService.getCookieValue(request, JWT_TOKEN);
        if (jwtToken == null || !jwtService.isTokenValid(jwtToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok().build();
    }
}
