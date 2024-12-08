package pe.edu.tecsup.shopsmart_user_backend.controllers;


import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.tecsup.shopsmart_user_backend.models.Product;
import pe.edu.tecsup.shopsmart_user_backend.models.Promotion;
import pe.edu.tecsup.shopsmart_user_backend.services.PromotionService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/promotions")
public class PromotionController {

    private final PromotionService promotionService;


    @GetMapping("/active")
    public ResponseEntity<List<Promotion>> getActivePromotions() {
        List<Promotion> promotions = promotionService.getActivePromotions();
        return ResponseEntity.ok(promotions);
    }

    @PostMapping("/register")
    public ResponseEntity<Promotion> registerPromotion(@RequestBody Promotion promotion) {
        Promotion registeredPromotion = promotionService.registerPromotion(promotion);
        return ResponseEntity.status(HttpStatus.CREATED).body(registeredPromotion);
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<Promotion>> getProductPromotions(@PathVariable Long productId) {
        Product product = new Product();
        product.setId(productId);
        List<Promotion> promotions = promotionService.getProductPromotions(product);
        return ResponseEntity.ok(promotions);
    }
}
