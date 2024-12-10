package pe.edu.tecsup.shopsmart_user_backend.dtos.purchase;

import pe.edu.tecsup.shopsmart_user_backend.models.Purchase;


public record PurchaseResponse (
        Long id,
        String name,
        Integer quantity,
        double price,
        String date
){
//    public PurchaseResponse(Purchase purchase){
//        this();
//    }
}
