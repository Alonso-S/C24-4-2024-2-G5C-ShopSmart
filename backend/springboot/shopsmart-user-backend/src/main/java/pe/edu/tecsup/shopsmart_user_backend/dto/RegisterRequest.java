package pe.edu.tecsup.shopsmart_user_backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDate;

public record RegisterRequest(
        @JsonProperty("first_name")
        String firstName,
        @JsonProperty("last_name")
        String lastName,
        LocalDate birthdate,
        String phone,
        String city,
        String state,
        String country,
        String address,
        String username,
        String email,
        String password
) {
}
