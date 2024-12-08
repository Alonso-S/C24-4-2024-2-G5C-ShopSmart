package pe.edu.tecsup.shopsmart_user_backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "promotions")
public class Promotion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "store_id", nullable = false)
    private Store store;  // La tienda donde se aplica la promoción.

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;  // El producto que tiene la promoción.

    private Double discountPercentage;  // Descuento en porcentaje (por ejemplo, 20%).
    private Double discountPrice;  // Precio con descuento (si se aplica un precio fijo).

    private LocalDateTime startDate;  // Fecha de inicio de la promoción.
    private LocalDateTime endDate;  // Fecha de fin de la promoción.

    private String description;  // Descripción de la promoción (opcional).

    @Enumerated(EnumType.STRING)
    private PromotionType type;  // Tipo de promoción (descuento, 2x1, etc.)

    @ManyToMany
    @JoinTable(
            name = "promotion_affected_categories",
            joinColumns = @JoinColumn(name = "promotion_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id"))
    private Set<Category> affectedCategories;  // Categorías de productos afectadas por la promoción (opcional).
}
