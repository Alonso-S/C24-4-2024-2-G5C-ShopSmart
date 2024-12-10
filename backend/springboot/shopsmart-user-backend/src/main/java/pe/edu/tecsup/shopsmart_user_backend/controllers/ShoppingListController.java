package pe.edu.tecsup.shopsmart_user_backend.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.tecsup.shopsmart_user_backend.dtos.shopping_list.ShoppingListResponse;
import pe.edu.tecsup.shopsmart_user_backend.models.ListItem;
import pe.edu.tecsup.shopsmart_user_backend.models.ShoppingList;
import pe.edu.tecsup.shopsmart_user_backend.models.User;
import pe.edu.tecsup.shopsmart_user_backend.services.ShoppingListService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/shopping-lists")
public class ShoppingListController {

    private final ShoppingListService shoppingListService;

    @PostMapping("/create")
    public ResponseEntity<ShoppingList> createShoppingList(@RequestBody ShoppingList shoppingList) {
        ShoppingList createdList = shoppingListService.createShoppingList(shoppingList);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdList);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ShoppingList>> getShoppingListsByUser(@PathVariable Long userId) {
        User user = new User();
        user.setId(userId);
        List<ShoppingList> shoppingLists = shoppingListService.getShoppingListsByUser(user);
        return ResponseEntity.ok(shoppingLists);
    }
    @GetMapping("/user/{userId}/latest")
    public List<ShoppingListResponse> getLatestShoppingLists(@PathVariable Long userId) {
        return shoppingListService.getLatestShoppingLists(userId);
    }

    @PostMapping("/add-item/{shoppingListId}")
    public ResponseEntity<ShoppingList> addItemToShoppingList(@PathVariable Long shoppingListId, @RequestBody ListItem item) {
        ShoppingList updatedList = shoppingListService.addItemToShoppingList(shoppingListId, item);
        return ResponseEntity.ok(updatedList);
    }

    @DeleteMapping("/remove-item/{shoppingListId}/{itemId}")
    public ResponseEntity<ShoppingList> removeItemFromShoppingList(@PathVariable Long shoppingListId, @PathVariable Long itemId) {
        ShoppingList updatedList = shoppingListService.removeItemFromShoppingList(shoppingListId, itemId);
        return ResponseEntity.ok(updatedList);
    }

    @GetMapping("/items/{shoppingListId}")
    public ResponseEntity<List<ListItem>> getItemsInShoppingList(@PathVariable Long shoppingListId) {
        List<ListItem> items = shoppingListService.getItemsInShoppingList(shoppingListId);
        return ResponseEntity.ok(items);
    }

}
