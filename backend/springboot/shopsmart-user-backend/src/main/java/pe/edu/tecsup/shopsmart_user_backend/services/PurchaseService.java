package pe.edu.tecsup.shopsmart_user_backend.services;

import pe.edu.tecsup.shopsmart_user_backend.dtos.purchase.PurchaseResponse;

import java.util.List;

public interface PurchaseService {
    List<PurchaseResponse> getRecentPurchases(Long userId);

}
