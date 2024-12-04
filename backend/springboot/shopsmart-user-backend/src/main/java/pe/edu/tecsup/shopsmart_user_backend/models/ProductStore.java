package pe.edu.tecsup.shopsmart_user_backend.models;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "product_store")
public class ProductStore {

    @EmbeddedId
    private ProductStoreId id;

    private int stock;
    private BigDecimal price;
    private Boolean isAvailable;

    public ProductStore(Product product, Store store, int stock, BigDecimal price, boolean isAvailable) {
        this.product = product;
        this.store = store;
        this.stock = stock;
        this.price = price;
        this.isAvailable = isAvailable;
        this.id = ProductStoreId.builder()
                .productId(product.getId())
                .storeId(store.getId()).
                build();
    }


    @ManyToOne
    @MapsId("productId")
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    private Product product;

    @ManyToOne
    @MapsId("storeId")
    @JoinColumn(name = "store_id", referencedColumnName = "id")
    private Store store;

}
