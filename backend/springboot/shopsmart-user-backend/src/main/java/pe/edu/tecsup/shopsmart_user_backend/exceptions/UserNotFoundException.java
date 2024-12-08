package pe.edu.tecsup.shopsmart_user_backend.exceptions;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(String message){
        super(message);

    }
}
