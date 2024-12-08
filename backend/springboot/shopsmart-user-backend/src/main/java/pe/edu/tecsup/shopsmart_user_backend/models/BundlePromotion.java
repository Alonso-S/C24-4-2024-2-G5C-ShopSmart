package pe.edu.tecsup.shopsmart_user_backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "bundle_promotions")
public class BundlePromotion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "store_id", nullable = false)
    private Store store;

    private String description;

    private Double discountPrice;

    private LocalDateTime startDate;
    private LocalDateTime endDate;

    @ManyToMany
    @JoinTable(
            name = "bundle_promotion_products",
            joinColumns = @JoinColumn(name = "bundle_promotion_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id"))
    private Set<Product> products;
    @ManyToMany
    @JoinTable(
            name = "bundle_promotion_categories",
            joinColumns = @JoinColumn(name = "bundle_promotion_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id"))
    private Set<Category> affectedCategories;
}