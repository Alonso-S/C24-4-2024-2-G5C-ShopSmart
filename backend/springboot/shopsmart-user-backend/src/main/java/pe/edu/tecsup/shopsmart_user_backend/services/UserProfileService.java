package pe.edu.tecsup.shopsmart_user_backend.services;

import pe.edu.tecsup.shopsmart_user_backend.dtos.user.UserProfileDTO;
import pe.edu.tecsup.shopsmart_user_backend.dtos.user.UserPublicInfo;

public interface UserProfileService {
    UserProfileDTO getUserProfile(String jwt);

    UserProfileDTO updateUserProfile(UserProfileDTO dto,String jwt);
    UserPublicInfo getUserPublicInfo(String jwt);
}
