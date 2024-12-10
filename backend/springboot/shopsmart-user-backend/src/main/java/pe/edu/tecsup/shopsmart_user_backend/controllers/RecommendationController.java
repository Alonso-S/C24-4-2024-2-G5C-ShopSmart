package pe.edu.tecsup.shopsmart_user_backend.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.tecsup.shopsmart_user_backend.dtos.product.ProductRecommendation;
import pe.edu.tecsup.shopsmart_user_backend.services.RecommendationService;

import java.util.List;

@RestController
@RequestMapping("/api/recommendations")
@RequiredArgsConstructor
public class RecommendationController {

    private final RecommendationService recommendationService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ProductRecommendation>> getRecommendations(@PathVariable Long userId) {
        return ResponseEntity.ok().body(recommendationService.getRecommendationsByUserId(userId));
    }


    @PostMapping("/generate/{userId}")
    public void generateRecommendations(@PathVariable Long userId) {
        recommendationService.generateRecommendations(userId);
    }

}
