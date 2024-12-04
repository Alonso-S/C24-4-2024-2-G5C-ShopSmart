package pe.edu.tecsup.shopsmart_user_backend.dtos;

import pe.edu.tecsup.shopsmart_user_backend.dtos.product_store.ProductInStoreDTO;

import java.util.Set;

public record StoreProductListDTO(
        Long storeId,
        String storeName,
        Set<ProductInStoreDTO> products
) {
}
