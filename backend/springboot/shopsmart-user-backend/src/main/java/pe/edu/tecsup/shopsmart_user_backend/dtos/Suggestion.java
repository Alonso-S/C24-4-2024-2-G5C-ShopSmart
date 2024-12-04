package pe.edu.tecsup.shopsmart_user_backend.dtos;

import java.math.BigDecimal;

public record Suggestion(
        Long productId,
        String productName,
        BigDecimal price,
        String storeName,
        int stock
) {}
