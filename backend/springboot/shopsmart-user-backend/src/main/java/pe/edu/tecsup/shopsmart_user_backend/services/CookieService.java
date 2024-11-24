package pe.edu.tecsup.shopsmart_user_backend.services;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
public class CookieService {

    private static final String SAME_SITE = "None";
    public static final String JWT_TOKEN = "jwt_token";
    public static final String REFRESH_TOKEN = "refresh_token";

    // Crea una cookie de JWT
    public Cookie createJwtCookie(String token) {
        Cookie cookie = new Cookie(JWT_TOKEN, token);
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setPath("/");
        cookie.setDomain("localhost");
        cookie.setMaxAge((60*60));
        return cookie;
    }

    // Crea una cookie de refresh token
    public Cookie createRefreshTokenCookie(String token) {
        Cookie cookie = new Cookie(REFRESH_TOKEN, token);
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setPath("/");
        cookie.setDomain("localhost");
        cookie.setMaxAge((24 * 60 * 60*7));
        return cookie;
    }

    // Método para obtener el valor de una cookie (ya está en tu controlador)
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

    public void deleteCookie(HttpServletResponse response, String cookieName) {
        Cookie cookie = new Cookie(cookieName, null);
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
    }
}
