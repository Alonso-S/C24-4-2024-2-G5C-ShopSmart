package pe.edu.tecsup.shopsmart_user_backend.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pe.edu.tecsup.shopsmart_user_backend.models.Product;
import pe.edu.tecsup.shopsmart_user_backend.models.Promotion;
import pe.edu.tecsup.shopsmart_user_backend.services.PromotionService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PromotionServiceImpl implements PromotionService {
    public List<Promotion> getActivePromotions() {
        return List.of();
    }

    public boolean isProductInPromotion(Product product) {
        return false;
    }

    public Promotion registerPromotion(Promotion promotion) {
        return null;
    }

    public List<Promotion> getProductPromotions(Product product) {
        return List.of();
    }
}
