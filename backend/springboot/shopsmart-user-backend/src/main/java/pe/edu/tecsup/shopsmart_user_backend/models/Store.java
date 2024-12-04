package pe.edu.tecsup.shopsmart_user_backend.models;

import jakarta.persistence.*;
import lombok.*;
import org.locationtech.jts.geom.Point;

import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "stores")
public class Store {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String address;

    @Column(columnDefinition= "geometry(Point,4326)")
    private Point location;

    @OneToMany(mappedBy = "store", fetch = FetchType.EAGER)
    private Set<ProductStore> productStores;

}