package pe.edu.tecsup.shopsmart_user_backend.services;

import pe.edu.tecsup.shopsmart_user_backend.models.ShoppingList;
import pe.edu.tecsup.shopsmart_user_backend.models.User;

import java.util.List;


public interface UserService {
    List<User> getAllUsers();
    User createUser(User user);
    User updateUser(Long id, User user);
    User getUserById(Long userId);
    /**
     * Método para obtener todas las listas de compras de un usuario.
     *
     * @param user El usuario cuyas listas de compras se desean obtener.
     * @return List de listas de compras asociadas al usuario.
     */
    List<ShoppingList> getShoppingLists(User user);

}
