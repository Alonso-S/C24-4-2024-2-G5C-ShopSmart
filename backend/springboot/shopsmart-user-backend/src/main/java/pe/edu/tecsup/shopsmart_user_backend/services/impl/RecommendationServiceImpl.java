package pe.edu.tecsup.shopsmart_user_backend.services.impl;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.tecsup.shopsmart_user_backend.dtos.product.ProductRecommendation;
import pe.edu.tecsup.shopsmart_user_backend.exceptions.UserNotFoundException;
import pe.edu.tecsup.shopsmart_user_backend.models.*;
import pe.edu.tecsup.shopsmart_user_backend.repositories.PurchaseRepository;
import pe.edu.tecsup.shopsmart_user_backend.repositories.RecommendationRepository;
import pe.edu.tecsup.shopsmart_user_backend.repositories.UserRepository;
import pe.edu.tecsup.shopsmart_user_backend.services.RecommendationService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RecommendationServiceImpl implements RecommendationService {


    private final PurchaseRepository purchaseRepository;
    private final UserRepository userRepository;

    private final RecommendationRepository recommendationRepository;

    @Transactional
    public List<ProductRecommendation> getRecommendationsByUserId(Long userId) {
        List<Recommendation> recommendations = recommendationRepository.findByUserId(userId);
        return recommendations.stream()
                .map(recommendation -> new ProductRecommendation(recommendation.getProduct()))
                .toList();
    }

    public void generateRecommendations(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(()->new UserNotFoundException("User not Found"));
        List<Purchase> purchases = purchaseRepository.findByUserId(userId);

        List<Product> products = purchases.stream()
                .flatMap(purchase -> purchase.getPurchaseItems().stream())
                .map(PurchaseItem::getProduct)
                .distinct()
                .toList();

        for (Product product : products) {
            Recommendation recommendation = new Recommendation();


            recommendation.setUser(user);
            recommendation.setProduct(product);
            recommendationRepository.save(recommendation);
        }
    }
}