package pe.edu.tecsup.shopsmart_user_backend.models;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name="shopping_lists")
public class ShoppingList{
    @Id
    private Long id;
    private String title;
    private String description;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="user_id")
    private User user;

    @OneToMany(mappedBy = "shoppingList")
    private Set<ListItem> listItems;


}
