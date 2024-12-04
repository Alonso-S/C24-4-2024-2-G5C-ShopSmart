package pe.edu.tecsup.shopsmart_user_backend.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name= "brands")
public class Brand {
    @Id
    private Long id;
    private String name;
    private String description;

    @OneToMany(mappedBy = "brand")
    private Set<Product> products;

}
