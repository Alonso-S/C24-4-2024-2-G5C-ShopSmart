package pe.edu.tecsup.shopsmart_user_backend.dtos.shopping_list;

import pe.edu.tecsup.shopsmart_user_backend.models.ShoppingList;

import java.util.Date;

public record ShoppingListResponse(
        Long id,
        String name,
        Date createdAt
) {
    public ShoppingListResponse(ShoppingList shoppingList){
        this(shoppingList.getId(),
                shoppingList.getName(),
                shoppingList.getCreatedAt());
    }
}
