package pe.edu.tecsup.shopsmart_user_backend.models;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import jakarta.validation.constraints.NotEmpty;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotEmpty
    private String name;

    private String avatar;
    @NotEmpty
    private String role;
    @NotEmpty
    private String phone;
    @NotEmpty
    private String address;
    @NotEmpty
    @Email
    private String email;
    @NotEmpty
    private String password;

    @NotEmpty
    private String province;

    @NotEmpty
    private String district;
}
