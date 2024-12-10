package pe.edu.tecsup.shopsmart_user_backend.dtos.user;

import pe.edu.tecsup.shopsmart_user_backend.models.User;

public record UserPublicInfo (
        Long id,
        String name,
        String avatar
) {

    public UserPublicInfo(User user){
        this(
                user.getId(),
                user.getName(),
                user.getAvatar()
        );
    }

}
