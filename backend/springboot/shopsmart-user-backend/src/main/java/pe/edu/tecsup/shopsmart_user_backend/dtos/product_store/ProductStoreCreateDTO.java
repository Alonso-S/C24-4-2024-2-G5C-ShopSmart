package pe.edu.tecsup.shopsmart_user_backend.dtos.product_store;

import java.math.BigDecimal;

public record ProductStoreCreateDTO (
        Long productId,
        int stock,
        BigDecimal price,
        boolean isAvailable
){
}
