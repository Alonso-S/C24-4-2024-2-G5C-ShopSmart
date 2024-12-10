package pe.edu.tecsup.shopsmart_user_backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.tecsup.shopsmart_user_backend.models.Purchase;

import java.util.List;

public interface PurchaseRepository extends JpaRepository<Purchase, Long> {
    List<Purchase> findTop5ByUserIdOrderByPurchaseDateDesc(Long userId);
    List<Purchase> findByUserId(Long userId);

}
