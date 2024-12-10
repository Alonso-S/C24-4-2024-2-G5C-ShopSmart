package pe.edu.tecsup.shopsmart_user_backend.services;

import pe.edu.tecsup.shopsmart_user_backend.dtos.shopping_list.ShoppingListResponse;
import pe.edu.tecsup.shopsmart_user_backend.models.ListItem;
import pe.edu.tecsup.shopsmart_user_backend.models.ShoppingList;
import pe.edu.tecsup.shopsmart_user_backend.models.User;

import java.util.List;

public interface ShoppingListService {

    /**
     * Método para crear una nueva lista de compras.
     *
     * @param shoppingList La lista de compras a crear.
     * @return La lista de compras creada.
     */
    ShoppingList createShoppingList(ShoppingList shoppingList);

    /**
     * Método para obtener todas las listas de compras de un usuario.
     *
     * @param user El usuario cuyas listas de compras se desean obtener.
     * @return List de listas de compras asociadas al usuario.
     */
    List<ShoppingList> getShoppingListsByUser(User user);

    /**
     * Método para agregar un producto a una lista de compras.
     *
     * @param shoppingListId El ID de la lista de compras.
     * @param listItem El item que se quiere agregar a la lista.
     * @return La lista de compras actualizada.
     */
    ShoppingList addItemToShoppingList(Long shoppingListId, ListItem listItem);

    /**
     * Método para eliminar un producto de una lista de compras.
     *
     * @param shoppingListId El ID de la lista de compras.
     * @param listItemId El ID del producto a eliminar.
     * @return La lista de compras actualizada.
     */
    ShoppingList removeItemFromShoppingList(Long shoppingListId, Long listItemId);

    /**
     * Método para obtener los productos de una lista de compras específica.
     *
     * @param shoppingListId El ID de la lista de compras.
     * @return List de productos de esa lista.
     */
    List<ListItem> getItemsInShoppingList(Long shoppingListId);

    List<ShoppingListResponse> getLatestShoppingLists(Long userId);
}
