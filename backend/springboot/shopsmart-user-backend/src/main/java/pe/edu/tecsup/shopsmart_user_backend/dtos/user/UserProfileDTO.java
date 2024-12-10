package pe.edu.tecsup.shopsmart_user_backend.dtos.user;

import pe.edu.tecsup.shopsmart_user_backend.models.User;

public record UserProfileDTO (
        String name,
        String phone,
        String address,
        String email,
        String province,
        String district,
        String avatar
) {
    public UserProfileDTO(User user){
        this(
                user.getName(),
                user.getPhone(),
                user.getAddress(),
                user.getEmail(),
                user.getProvince(),
                user.getDistrict(),
                user.getAvatar()
        );
    }
}
