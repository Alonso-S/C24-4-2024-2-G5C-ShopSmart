package pe.edu.tecsup.shopsmart_user_backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.tecsup.shopsmart_user_backend.models.ShoppingList;

import java.util.List;

@Repository
public interface ShoppingListRepository extends JpaRepository<ShoppingList, Long> {
    List<ShoppingList> findTop5ByUserIdOrderByCreatedAtDesc(Long userId);

}
