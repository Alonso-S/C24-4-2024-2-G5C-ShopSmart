package pe.edu.tecsup.shopsmart_user_backend.exceptions;

public class StoresNotFoundException extends RuntimeException {
    public StoresNotFoundException(String message) {
        super(message);
    }
}