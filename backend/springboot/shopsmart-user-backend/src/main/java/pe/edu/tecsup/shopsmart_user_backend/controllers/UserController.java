package pe.edu.tecsup.shopsmart_user_backend.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.tecsup.shopsmart_user_backend.models.User;
import pe.edu.tecsup.shopsmart_user_backend.services.UserService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {

        List<User> users = userService.getAllUsers();

        return ResponseEntity.ok().body(users);
    }

    @PostMapping
    public ResponseEntity<User> addUser(@RequestBody User user) {
        User savedUser = userService.createUser(user);
        return  ResponseEntity.ok().body(savedUser);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
        User updatedUser = userService.updateUser(id, user);
        return  ResponseEntity.ok().body(updatedUser);
    }
}
