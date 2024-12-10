package pe.edu.tecsup.shopsmart_user_backend.exceptions;

public class PurchaseNotFoundException extends RuntimeException {
    public PurchaseNotFoundException(String message) {
        super(message);
    }
}
