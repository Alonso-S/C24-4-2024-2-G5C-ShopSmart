package pe.edu.tecsup.shopsmart_user_backend.dtos.product_store;

import pe.edu.tecsup.shopsmart_user_backend.dtos.store.StoreWithPrice;
import pe.edu.tecsup.shopsmart_user_backend.models.Product;

import java.util.List;

public record ProductWithStores (
        Long id,
        String name,
        String description,
        List<StoreWithPrice> stores
){
    public ProductWithStores (Product product){
                this(
                        product.getId(),
                        product.getName(),
                        product.getDescription(),
                        product.getProductStores().stream().map(StoreWithPrice::new).toList()
                );
    }
    public  ProductWithStores(Product product, List<StoreWithPrice> stores ){
        this(
                product.getId(),
                product.getName(),
                product.getDescription(),
                stores

        );
    }
}
