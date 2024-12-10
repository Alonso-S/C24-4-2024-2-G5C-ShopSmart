package pe.edu.tecsup.shopsmart_user_backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.edu.tecsup.shopsmart_user_backend.models.ProductStore;
import pe.edu.tecsup.shopsmart_user_backend.models.ProductStoreId;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductStoreRepository extends JpaRepository<ProductStore, Long> {


    Integer findStockByProductIdAndStoreId(Long productId, Long storeId);

    List<ProductStore> findByStoreId(Long id);

    List<ProductStore> findByProductId(Long id);

    Optional<ProductStore> findById(ProductStoreId id);

    void deleteById(ProductStoreId id);

    @Query("SELECT ps FROM ProductStore ps " +
            "WHERE ps.product.name LIKE %:searchTerm% " +
            "AND ps.price BETWEEN :minPrice AND :maxPrice")
    List<ProductStore> searchProductStores(@Param("searchTerm") String searchTerm,
                                           @Param("minPrice") Double minPrice,
                                           @Param("maxPrice") Double maxPrice);

    @Query("SELECT ps FROM ProductStore ps WHERE ps.product.id = :productId")
    List<ProductStore> findStoresByProductId(Long productId);

}
