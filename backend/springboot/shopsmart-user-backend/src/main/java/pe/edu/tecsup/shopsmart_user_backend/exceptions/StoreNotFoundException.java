package pe.edu.tecsup.shopsmart_user_backend.exceptions;

public class StoreNotFoundException extends RuntimeException {
    public StoreNotFoundException(String message) {
        super(message);
    }
}
