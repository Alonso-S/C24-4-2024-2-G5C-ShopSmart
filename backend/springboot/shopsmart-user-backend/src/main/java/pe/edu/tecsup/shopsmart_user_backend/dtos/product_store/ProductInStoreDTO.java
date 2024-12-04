package pe.edu.tecsup.shopsmart_user_backend.dtos.product_store;

import pe.edu.tecsup.shopsmart_user_backend.models.ProductStore;
import java.math.BigDecimal;

public record ProductInStoreDTO (
            Long productId,
            int stock,
            BigDecimal price,
            boolean isAvailable
){
    public ProductInStoreDTO (ProductStore ps){
        this(
                ps.getProduct().getId(),
                ps.getStock(),
                ps.getPrice(),
                ps.getIsAvailable()
        );
    }
}
