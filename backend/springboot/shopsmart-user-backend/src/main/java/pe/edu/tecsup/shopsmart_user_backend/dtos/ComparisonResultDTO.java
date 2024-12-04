package pe.edu.tecsup.shopsmart_user_backend.dtos;


import org.locationtech.jts.geom.Point;

import java.math.BigDecimal;

public record ComparisonResultDTO(
        Long productId,
        String productName,
        BigDecimal price,
        String storeName,
        Point storeLocation,
        Integer stock) {
}

