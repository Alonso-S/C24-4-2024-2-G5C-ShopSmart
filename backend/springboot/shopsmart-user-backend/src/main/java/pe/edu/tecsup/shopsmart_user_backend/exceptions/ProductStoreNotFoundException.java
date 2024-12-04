package pe.edu.tecsup.shopsmart_user_backend.exceptions;

public class ProductStoreNotFoundException extends RuntimeException {
    public ProductStoreNotFoundException(String message) {
        super(message);
    }

}
