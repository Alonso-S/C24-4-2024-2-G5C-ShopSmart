package pe.edu.tecsup.shopsmart_user_backend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.*;

import java.util.Set;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name ="categories")
public class Category {
    @Id
    private Long id;
    private String name;
    private String description;

    @OneToMany(mappedBy = "category")
    private Set<Product> products;
}
