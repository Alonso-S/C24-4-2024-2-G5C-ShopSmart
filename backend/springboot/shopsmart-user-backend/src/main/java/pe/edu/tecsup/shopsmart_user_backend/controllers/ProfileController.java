package pe.edu.tecsup.shopsmart_user_backend.controllers;


import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.tecsup.shopsmart_user_backend.dtos.user.UserProfileDTO;
import pe.edu.tecsup.shopsmart_user_backend.services.CookieService;
import pe.edu.tecsup.shopsmart_user_backend.services.UserProfileService;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/profile")
public class ProfileController {
    private final CookieService cookieService;

    private final UserProfileService userProfileService;
    @GetMapping
    public ResponseEntity<UserProfileDTO> getUserProfile(HttpServletRequest request) {
        String token = cookieService.getCookieValue(request , "jwt_token");
        UserProfileDTO userProfile =  userProfileService.getUserProfile(token);

        return ResponseEntity.ok(userProfile);
    }
    @GetMapping("/save")
    public ResponseEntity<UserProfileDTO> saveUserProfile(
            @RequestBody UserProfileDTO user,
            HttpServletRequest request) {
        String token = cookieService.getCookieValue(request , "jwt_token");

        UserProfileDTO userProfile = userProfileService.updateUserProfile(user, token);

        return ResponseEntity.ok(userProfile);
        }

}
