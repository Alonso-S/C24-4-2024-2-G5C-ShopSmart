package pe.edu.tecsup.shopsmart_user_backend.exceptions;

public class BrandNotFoundException extends RuntimeException {
    public BrandNotFoundException(String message) {
        super(message);
    }
}
