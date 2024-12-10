package pe.edu.tecsup.shopsmart_user_backend.dtos.product;

import pe.edu.tecsup.shopsmart_user_backend.models.Product;

public record ProductRecommendation(
        Long id,
        String name,
        String description,
        String image
) {
    public ProductRecommendation (Product product) {
        this(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getImage());

    }
}
