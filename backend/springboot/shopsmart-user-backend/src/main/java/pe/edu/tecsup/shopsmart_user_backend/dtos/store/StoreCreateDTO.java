package pe.edu.tecsup.shopsmart_user_backend.dtos.store;


import org.locationtech.jts.geom.Point;

public record StoreCreateDTO(
        String name,
        String address,
        Point location
){
}
