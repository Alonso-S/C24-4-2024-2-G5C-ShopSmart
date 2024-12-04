package pe.edu.tecsup.shopsmart_user_backend.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.edu.tecsup.shopsmart_user_backend.models.Product;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT p FROM Product p " +
            "LEFT JOIN Brand b " + // Suponiendo que 'brand' es una relación ManyToOne a la entidad Brand
            "LEFT JOIN Category c " + // Suponiendo que 'category' es una relación ManyToOne a la entidad Category
            "LEFT JOIN ProductStore ps ON ps.product = p " +
            "LEFT JOIN Store s ON s = ps.store " +
            "WHERE (LOWER(p.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) " +
            "OR LOWER(b.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) " +
            "OR LOWER(c.name) LIKE LOWER(CONCAT('%', :searchTerm, '%'))) " +
            "AND ps.price BETWEEN :minPrice AND :maxPrice")
    List<Product> searchProducts(@Param("searchTerm") String searchTerm,
                                 @Param("minPrice") Double minPrice,
                                 @Param("maxPrice") Double maxPrice);



    // Si necesitas obtener el stock de un producto en una tienda específica, puedes hacerlo con la tabla intermedia
    @Query("SELECT ps.stock FROM ProductStore ps WHERE ps.product.id = :productId AND ps.store.id = :storeId")
    Integer findStockByProductAndStore(@Param("productId") Long productId, @Param("storeId") Long storeId);

    @Query("SELECT p FROM Product p JOIN FETCH p.productStores WHERE p.id = :id")
    Product findByIdWithStores(@Param("id") Long id);

}
