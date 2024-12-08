package pe.edu.tecsup.shopsmart_user_backend.services;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Service;
import org.springframework.http.ResponseCookie;
import java.time.Duration;

@Service
public class CookieService {

    private static final String SAME_SITE = "Strict";
    public static final String JWT_TOKEN = "jwt_token";
    public static final String REFRESH_TOKEN = "refresh_token";

    public ResponseCookie createJwtCookie(String token) {
        return ResponseCookie.from(JWT_TOKEN, token)
                .httpOnly(true)
                .secure(false)
                .path("/")
                .sameSite(SAME_SITE)
                .maxAge(Duration.ofHours(1))
                .build();
    }

    public ResponseCookie createRefreshTokenCookie(String token) {
        return ResponseCookie.from(REFRESH_TOKEN, token)
                .httpOnly(true)
                .secure(false)
                .path("/")
                .sameSite(SAME_SITE)
                .maxAge(Duration.ofDays(7))
                .build();
    }

    public String getCookieValue(HttpServletRequest request, String cookieName) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookieName.equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }


    public void clearJwtCookie(HttpServletResponse response) {
        ResponseCookie jwtCookie = ResponseCookie.from(JWT_TOKEN, "")
                .path("/")
                .httpOnly(true)
                .secure(false)
                .maxAge(0)
                .sameSite(SAME_SITE)
                .build();
        response.addHeader("Set-Cookie", jwtCookie.toString());


        ResponseCookie refreshTokenCookie = ResponseCookie.from(REFRESH_TOKEN, "")
                .path("/")
                .httpOnly(true)
                .secure(false)
                .maxAge(0)
                .sameSite(SAME_SITE)
                .build();

        response.addHeader("Set-Cookie", refreshTokenCookie.toString());
    }

}
