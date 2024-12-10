package pe.edu.tecsup.shopsmart_user_backend.services;

import pe.edu.tecsup.shopsmart_user_backend.dtos.product.ProductRecommendation;

import java.util.List;

public interface RecommendationService {
    List<ProductRecommendation> getRecommendationsByUserId(Long userId);

    void generateRecommendations(Long userId);
}