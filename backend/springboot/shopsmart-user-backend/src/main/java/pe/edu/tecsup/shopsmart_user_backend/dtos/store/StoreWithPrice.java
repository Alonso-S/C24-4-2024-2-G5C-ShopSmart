package pe.edu.tecsup.shopsmart_user_backend.dtos.store;

import pe.edu.tecsup.shopsmart_user_backend.models.ProductStore;

import java.math.BigDecimal;

public record StoreWithPrice(
        Long id,
        int stock,
        BigDecimal price,
        boolean isAvailable,
        double latitude,
        double longitude
) {
    public StoreWithPrice (ProductStore ps){
        this(ps.getStore().getId(), ps.getStock(),
                ps.getPrice(),
                ps.getIsAvailable(),
                (ps.getStore().getLocation() != null) ? ps.getStore().getLocation().getX() : 0.0,
                (ps.getStore().getLocation() != null) ? ps.getStore().getLocation().getY() : 0.0);
    }
}
