package pe.edu.tecsup.shopsmart_user_backend.dtos.auth;

public record RegisterRequest(
        String name,
        String phone,
        String address,
        String email,
        String password,
        String province,
        String district,
        String role

) {

}
