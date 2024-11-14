package pe.edu.tecsup.shopsmart_user_backend.dto;

public record LoginRequest(
        String email,
        String password
) {
}
