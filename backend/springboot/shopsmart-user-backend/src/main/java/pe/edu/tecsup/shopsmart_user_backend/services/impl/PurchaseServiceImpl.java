package pe.edu.tecsup.shopsmart_user_backend.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.tecsup.shopsmart_user_backend.dtos.purchase.PurchaseResponse;
import pe.edu.tecsup.shopsmart_user_backend.exceptions.PurchaseNotFoundException;
import pe.edu.tecsup.shopsmart_user_backend.models.Purchase;
import pe.edu.tecsup.shopsmart_user_backend.repositories.PurchaseRepository;
import pe.edu.tecsup.shopsmart_user_backend.services.PurchaseService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PurchaseServiceImpl implements PurchaseService {
    private final PurchaseRepository purchaseRepository;


    @Transactional
    public List<PurchaseResponse> getRecentPurchases(Long userId) {
        List<Purchase> purchases = purchaseRepository.findTop5ByUserIdOrderByPurchaseDateDesc(userId);

        return purchases.stream().map(purchase -> new PurchaseResponse(
                purchase.getId(),
                purchase.getPurchaseItems().stream().findFirst().orElseThrow(()-> new PurchaseNotFoundException("Purchase not Found")).getProduct().getName(),
                purchase.getPurchaseItems().stream().findFirst().get().getQuantity(),
                purchase.getTotalAmount(),
                purchase.getPurchaseDate().toString()
        )).toList();

    }
}
