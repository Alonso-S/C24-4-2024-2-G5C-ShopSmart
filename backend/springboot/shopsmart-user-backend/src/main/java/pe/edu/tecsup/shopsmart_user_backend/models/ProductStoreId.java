package pe.edu.tecsup.shopsmart_user_backend.models;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductStoreId implements Serializable {
    private Long productId;
    private Long storeId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ProductStoreId that = (ProductStoreId) o;
        return Objects.equals(productId, that.productId) && Objects.equals(storeId, that.storeId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(productId, storeId);
    }
}