package pe.edu.tecsup.shopsmart_user_backend.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pe.edu.tecsup.shopsmart_user_backend.dtos.user.UserProfileDTO;
import pe.edu.tecsup.shopsmart_user_backend.dtos.user.UserPublicInfo;
import pe.edu.tecsup.shopsmart_user_backend.models.User;
import pe.edu.tecsup.shopsmart_user_backend.services.JwtService;
import pe.edu.tecsup.shopsmart_user_backend.services.UserProfileService;
import pe.edu.tecsup.shopsmart_user_backend.services.UserService;

@Service
@RequiredArgsConstructor
public class UserProfileServiceImpl implements UserProfileService {
    private final JwtService jwtService;
    private final UserService userService;
    public UserProfileDTO getUserProfile(String jwt) {
        Long id = jwtService.extractId(jwt);
        User user = userService.getUserById(id);
        return new UserProfileDTO(user);
    }

    public UserProfileDTO updateUserProfile(UserProfileDTO dto, String jwt) {
        Long id = jwtService.extractId(jwt);
        User user = userService.getUserById(id);
        user.setName(dto.name());
        user.setEmail(dto.email());
        user.setPhone(dto.phone());
        user.setAddress(dto.address());
        user.setProvince(dto.province());
        user.setDistrict(dto.district());
        user.setAvatar(dto.avatar());
        userService.updateUser(id, user);
        return new UserProfileDTO(user);
    }
    public UserPublicInfo getUserPublicInfo(String jwt) {
        Long id = jwtService.extractId(jwt);
        User user = userService.getUserById(id);
        return  new UserPublicInfo(user);
    }
}
