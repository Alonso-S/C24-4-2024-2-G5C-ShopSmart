package pe.edu.tecsup.shopsmart_user_backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.tecsup.shopsmart_user_backend.models.Category;

@Repository
public interface CategoryRespository extends JpaRepository<Category, Long> {
}
