package pe.edu.tecsup.shopsmart_user_backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.tecsup.shopsmart_user_backend.models.Recommendation;

import java.util.List;
import java.util.Optional;

public interface RecommendationRepository extends JpaRepository<Recommendation, Long> {
    // Método para obtener las recomendaciones por usuario
    List<Recommendation> findByUserId(Long userId);

    // Método para obtener una recomendación específica por usuario y producto
    Optional<Recommendation> findByUserIdAndProductId(Long userId, Long productId);
}
