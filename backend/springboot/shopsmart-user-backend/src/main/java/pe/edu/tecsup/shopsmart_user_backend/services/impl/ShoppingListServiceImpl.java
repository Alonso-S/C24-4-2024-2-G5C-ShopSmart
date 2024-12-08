package pe.edu.tecsup.shopsmart_user_backend.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pe.edu.tecsup.shopsmart_user_backend.models.ListItem;
import pe.edu.tecsup.shopsmart_user_backend.models.ShoppingList;
import pe.edu.tecsup.shopsmart_user_backend.models.User;
import pe.edu.tecsup.shopsmart_user_backend.services.ShoppingListService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ShoppingListServiceImpl implements ShoppingListService {
    public ShoppingList createShoppingList(ShoppingList shoppingList) {
        return null;
    }

    public List<ShoppingList> getShoppingListsByUser(User user) {
        return List.of();
    }

    public ShoppingList addItemToShoppingList(Long shoppingListId, ListItem listItem) {
        return null;
    }

    public ShoppingList removeItemFromShoppingList(Long shoppingListId, Long listItemId) {
        return null;
    }

    public List<ListItem> getItemsInShoppingList(Long shoppingListId) {
        return List.of();
    }
}