package pe.edu.tecsup.shopsmart_user_backend.models;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="refresh_tokens")
public class RefreshToken {

    @Id
    @GeneratedValue
    private Long id;

    @Column(unique=true)
    private String token;

    private Boolean isRevoked;

    private Boolean isExpired;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    public User user;




}
