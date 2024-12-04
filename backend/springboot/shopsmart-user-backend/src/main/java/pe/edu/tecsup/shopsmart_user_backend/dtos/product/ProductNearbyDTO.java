package pe.edu.tecsup.shopsmart_user_backend.dtos.product;


import java.math.BigDecimal;

public record ProductNearbyDTO(
        Long productId,
        String productName,
        BigDecimal price,
        Long storeId,
        String storeName,
        double storeLocation

        ) {
}
