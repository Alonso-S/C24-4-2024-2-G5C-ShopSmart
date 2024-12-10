package pe.edu.tecsup.shopsmart_user_backend.controllers;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pe.edu.tecsup.shopsmart_user_backend.dtos.purchase.PurchaseResponse;
import pe.edu.tecsup.shopsmart_user_backend.services.PurchaseService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/purchases")
public class PurchaseController {
    private final PurchaseService purchaseService;
    @GetMapping("/recent/{userId}")
    public List<PurchaseResponse> getRecentPurchases(@PathVariable Long userId) {
        return purchaseService.getRecentPurchases(userId);
    }
}
