package pe.edu.tecsup.shopsmart_user_backend.dtos.auth;

public record LoginRequest(
        String email,
        String password
) {
}
