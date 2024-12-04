package pe.edu.tecsup.shopsmart_user_backend.dtos.store;

import org.locationtech.jts.geom.Point;
import pe.edu.tecsup.shopsmart_user_backend.dtos.product_store.ProductInStoreDTO;
import pe.edu.tecsup.shopsmart_user_backend.models.Store;

import java.util.Set;
import java.util.stream.Collectors;

public record StoreDTO(
        Long id,
        String name,
        String address,
        Point location,
        Set<ProductInStoreDTO> productStores
) {
    public StoreDTO(Store store){
        this(
                store.getId(),
                store.getName(),
                store.getAddress(),
                store.getLocation(),
                store.getProductStores().stream()
                        .map(ProductInStoreDTO::new)
                        .collect(Collectors.toSet())
        );
    }

}
