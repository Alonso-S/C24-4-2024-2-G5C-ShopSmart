package pe.edu.tecsup.shopsmart_user_backend.services;

import pe.edu.tecsup.shopsmart_user_backend.models.User;

import java.util.List;


public interface UserService {
    List<User> getAllUsers();
    User createUser(User user);
    User updateUser(Long id, User user);


}
