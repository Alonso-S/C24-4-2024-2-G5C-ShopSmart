package pe.edu.tecsup.shopsmart_user_backend.dtos.brand;

import pe.edu.tecsup.shopsmart_user_backend.dtos.product.ProductDTO;
import java.util.Set;

public record BrandDTO(
        Long id,
        String name,
        String description,
        Set<ProductDTO> products
) {
}
