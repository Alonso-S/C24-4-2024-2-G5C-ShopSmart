package pe.edu.tecsup.shopsmart_user_backend.dtos.product;

import java.math.BigDecimal;

public record ProductPriceComparisonDTO (
        Long productId,
        String productName,
        Long storeId,
        String storeName,
        BigDecimal price,
        int stock,
        boolean isAvailable,
        double distanceFromUser
){}
