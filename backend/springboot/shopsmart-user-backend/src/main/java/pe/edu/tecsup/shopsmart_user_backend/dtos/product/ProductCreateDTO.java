package pe.edu.tecsup.shopsmart_user_backend.dtos.product;

public record ProductCreateDTO(
        String name,
        String description,
        String image,
        Long brandId,
        Long categoryId
) {
}
