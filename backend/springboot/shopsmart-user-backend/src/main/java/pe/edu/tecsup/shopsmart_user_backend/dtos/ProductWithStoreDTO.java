package pe.edu.tecsup.shopsmart_user_backend.dtos;

import org.springframework.data.geo.Point;

import java.math.BigDecimal;

public record ProductWithStoreDTO(
        Long productId,       // ID del producto
        String productName,   // Nombre del producto
        BigDecimal price,     // Precio
        String storeName,     // Nombre de la tienda
        Point storeLocation, // Ubicación de la tienda (Point)
        Integer stock         // Stock disponible en esa tienda
) {}

