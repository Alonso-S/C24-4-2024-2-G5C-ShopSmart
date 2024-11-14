package pe.edu.tecsup.shopsmart_user_backend.models;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import jakarta.validation.constraints.NotEmpty;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

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
    private String firstName;
    @NotEmpty
    private String lastName;
    @NotNull
    private LocalDate birthdate;
    @NotEmpty
    private String username;
    @NotEmpty
    private String password;

    @NotEmpty
    @Email
    private String email;
    private String phone;
    private String city;
    private String state;
    private String country;
    private String address;
}
