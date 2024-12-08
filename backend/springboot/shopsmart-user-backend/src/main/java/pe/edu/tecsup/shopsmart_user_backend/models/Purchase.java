package pe.edu.tecsup.shopsmart_user_backend.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "purchases")
public class Purchase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;  // Usuario que realizó la compra

    @ManyToOne
    @JoinColumn(name = "store_id")
    private Store store;  // Tienda en la que se realizó la compra

    private Double totalAmount;  // Monto total de la compra
    private Date purchaseDate;   // Fecha de la compra

    @OneToMany(mappedBy = "purchase")
    private Set<PurchaseItem> purchaseItems;  // Productos comprados en esta compra

}
