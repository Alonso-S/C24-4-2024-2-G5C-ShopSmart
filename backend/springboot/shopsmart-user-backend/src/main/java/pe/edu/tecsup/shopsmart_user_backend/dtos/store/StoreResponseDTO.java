package pe.edu.tecsup.shopsmart_user_backend.dtos.store;

import pe.edu.tecsup.shopsmart_user_backend.dtos.product_store.ProductInStoreDTO;

import java.util.ArrayList;
import java.util.List;

public record StoreResponseDTO (
    Long id,
    String name,
    String address,
    double latitude,
    double longitude,
    List<ProductInStoreDTO> productStores
){
    public StoreResponseDTO (StoreDTO storeDto){
        this(
                storeDto.id(),
                storeDto.name(),
                storeDto.address(),
                (storeDto.location() != null) ? storeDto.location().getX() : 0.0,
                (storeDto.location() != null) ? storeDto.location().getY() : 0.0,
                new ArrayList<>(storeDto.productStores())
        );
    }
}
