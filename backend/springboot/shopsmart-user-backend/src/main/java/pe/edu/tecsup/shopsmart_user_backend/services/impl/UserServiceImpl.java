package pe.edu.tecsup.shopsmart_user_backend.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pe.edu.tecsup.shopsmart_user_backend.exceptions.UserNotFoundException;
import pe.edu.tecsup.shopsmart_user_backend.models.ShoppingList;
import pe.edu.tecsup.shopsmart_user_backend.models.User;
import pe.edu.tecsup.shopsmart_user_backend.repositories.UserRepository;
import pe.edu.tecsup.shopsmart_user_backend.services.UserService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    public List<User> getAllUsers() {
        List<User> users = userRepository.findAll();

        return users;
    }

    public User createUser(User user) {
        return null;
    }

    public User updateUser(Long id, User user) {
        User savedUser = userRepository.findById(id).orElseThrow(()-> new UserNotFoundException("User not found"));
        savedUser.setName(user.getName());
        savedUser.setEmail(user.getEmail());
        savedUser.setPassword(user.getPassword());
        savedUser.setPhone(user.getPhone());
        savedUser.setAddress(user.getAddress());

        userRepository.save(savedUser);
        return savedUser;
    }

    public User getUserById(Long userId) {
        return userRepository.findById(userId).orElseThrow(
                ()->new UserNotFoundException("User not found with id " + userId)
        );
    }

    public List<ShoppingList> getShoppingLists(User user) {
        return List.of();
    }
}
