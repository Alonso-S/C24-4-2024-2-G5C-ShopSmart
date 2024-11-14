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
@Table(name="tokens")
public class Token {
    public enum TokenType {
        BEARER
    }
    @Id
    @GeneratedValue
    private Long id;

    @Builder.Default
    private TokenType tokenType =  TokenType.BEARER;


    @Column(unique=true)
    private String token;

    private Boolean isRevoked;

    private Boolean isExpired;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    public User user;




}
