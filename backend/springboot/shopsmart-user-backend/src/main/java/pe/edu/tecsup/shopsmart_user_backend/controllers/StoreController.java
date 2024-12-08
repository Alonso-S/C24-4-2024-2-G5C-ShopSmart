package pe.edu.tecsup.shopsmart_user_backend.controllers;


import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.tecsup.shopsmart_user_backend.dtos.product_store.ProductInStoreDTO;
import pe.edu.tecsup.shopsmart_user_backend.dtos.product_store.ProductInStoreUpdateDTO;
import pe.edu.tecsup.shopsmart_user_backend.dtos.store.StoreCreateDTO;
import pe.edu.tecsup.shopsmart_user_backend.dtos.store.StoreDTO;
import pe.edu.tecsup.shopsmart_user_backend.dtos.store.StoreResponseDTO;
import pe.edu.tecsup.shopsmart_user_backend.dtos.store.StoreUpdateDTO;
import pe.edu.tecsup.shopsmart_user_backend.services.ProductStoreService;
import pe.edu.tecsup.shopsmart_user_backend.services.StoreService;

import java.util.List;
import java.util.Set;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api/stores")
public class StoreController {
    private final StoreService storeService;
    private final ProductStoreService productStoreService;

    @GetMapping
    public ResponseEntity<List<StoreResponseDTO>> getAllStores() {
        List<StoreResponseDTO> stores = storeService.getAllStores().stream().map(StoreResponseDTO::new).toList();
        return ResponseEntity.ok(stores);
    }

    @GetMapping("/{storeId}")
    public ResponseEntity<StoreResponseDTO> getStoreById(@PathVariable Long storeId) {
        StoreDTO store = storeService.getStoreById(storeId);
        StoreResponseDTO storeDTO = new StoreResponseDTO(store);
        return ResponseEntity.ok(storeDTO);
    }

    @PostMapping
    public ResponseEntity<StoreResponseDTO> createStore(@RequestBody StoreCreateDTO storeCreateDTO) {

        StoreDTO store = storeService.createStore(storeCreateDTO);
        StoreResponseDTO storeDTO = new StoreResponseDTO(store);
        return new ResponseEntity<>(storeDTO, HttpStatus.CREATED);
    }

    @PutMapping("/{storeId}")
    public ResponseEntity<StoreResponseDTO> updateStore(@PathVariable Long storeId, @RequestBody StoreUpdateDTO storeUpdateDTO) {
        StoreDTO store = storeService.updateStore(storeId, storeUpdateDTO);
        StoreResponseDTO storeDTO = new StoreResponseDTO(store);
        return ResponseEntity.ok(storeDTO);
    }

    @DeleteMapping("/{storeId}")
    public ResponseEntity<Void> deleteStore(@PathVariable Long storeId) {
        storeService.deleteStore(storeId);
        return ResponseEntity.noContent().build();
    }


    @GetMapping("/{storeId}/products")
    public ResponseEntity<List<ProductInStoreDTO>> getAllProductsInStore(@PathVariable Long storeId) {
        return ResponseEntity.ok(productStoreService.getAllProductsInStore(storeId));
    }

    @GetMapping("/{storeId}/products/{productId}")
    public ResponseEntity<ProductInStoreDTO> getProductInStore(
            @PathVariable Long storeId,
            @PathVariable Long productId) {
        return ResponseEntity.ok(productStoreService.getProductInStore(storeId, productId));
    }



    @PostMapping("/{storeId}/products")
    public ResponseEntity<Set<ProductInStoreDTO>> addProductsToStore(@PathVariable Long storeId, @RequestBody Set<ProductInStoreDTO> productStoreCreateDTO) {

        Set<ProductInStoreDTO> productStore = productStoreService.addProductsToStoreInventory(storeId, productStoreCreateDTO);
        return new ResponseEntity<>(productStore, HttpStatus.CREATED);
    }

    @PutMapping("/{storeId}/products/{productId}")
    public ResponseEntity<ProductInStoreDTO> updateProductInStore(
            @PathVariable Long storeId,
            @PathVariable Long productId,
            @RequestBody ProductInStoreUpdateDTO dto
    ) {
        ProductInStoreDTO productStore = productStoreService.updateProductInStore(storeId, productId, dto);
        return ResponseEntity.ok(productStore);
    }

    @DeleteMapping("/{storeId}/products/{productId}")
    public ResponseEntity<Void> deleteProductInStore(@PathVariable Long storeId, @PathVariable Long productId) {
        productStoreService.deleteProductInStore(storeId, productId);
        return ResponseEntity.noContent().build();
    }

}

