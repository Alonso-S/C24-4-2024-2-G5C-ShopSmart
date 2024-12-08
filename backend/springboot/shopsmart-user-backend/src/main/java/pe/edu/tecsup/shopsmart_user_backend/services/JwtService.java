package pe.edu.tecsup.shopsmart_user_backend.services;


import pe.edu.tecsup.shopsmart_user_backend.models.User;

public interface JwtService {
    String generateToken(User user);
    String generateRefreshToken(final User user);
    boolean isTokenValid(String token);
    boolean isTokenExpired(String token);
    String extractUsername(String token);
    Long extractId(String token);

}
