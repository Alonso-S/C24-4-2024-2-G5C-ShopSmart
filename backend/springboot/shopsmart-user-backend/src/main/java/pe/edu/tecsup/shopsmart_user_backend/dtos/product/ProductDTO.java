package pe.edu.tecsup.shopsmart_user_backend.dtos.product;

import pe.edu.tecsup.shopsmart_user_backend.models.Product;

public record ProductDTO(
        Long id,
        String name,
        String description,
        String image,
        Long categoryId,
        Long brandId
) {
    public ProductDTO(Product product) {
        this(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getImage(),
                product.getCategory().getId(),
                product.getBrand().getId());
    }

}
