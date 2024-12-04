package pe.edu.tecsup.shopsmart_user_backend.dtos.product_store;

import pe.edu.tecsup.shopsmart_user_backend.models.ProductStore;

import java.math.BigDecimal;

public record ProductStoreDTO(
        Long productId,
        Long storeId,
        int stock,
        BigDecimal price,
        boolean isAvailable
) {
    public ProductStoreDTO (ProductStore productStore){
        this(
                productStore.getProduct().getId(),
                productStore.getStore().getId(),
                productStore.getStock(),
                productStore.getPrice(),
                productStore.getIsAvailable()
        );
    }

}
