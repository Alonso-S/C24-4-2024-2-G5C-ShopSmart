package pe.edu.tecsup.shopsmart_user_backend.services;

import pe.edu.tecsup.shopsmart_user_backend.models.PriceAlert;
import pe.edu.tecsup.shopsmart_user_backend.models.ShoppingList;
import pe.edu.tecsup.shopsmart_user_backend.models.User;

public interface NotificationService {

    /**
     * Método para enviar una notificación al usuario.
     *
     * @param user El usuario que recibirá la notificación.
     * @param message El mensaje que se enviará al usuario.
     */
    void sendNotification(User user, String message);

    /**
     * Método para enviar una notificación de alerta de precio.
     *
     * @param user El usuario que recibirá la notificación.
     * @param priceAlert La alerta de precio que será notificada.
     */
    void sendPriceAlertNotification(User user, PriceAlert priceAlert);

    /**
     * Método para enviar un recordatorio sobre productos en la lista de compras.
     *
     * @param user El usuario que recibirá el recordatorio.
     * @param shoppingList La lista de compras para la cual se enviará el recordatorio.
     */
    void sendShoppingListReminder(User user, ShoppingList shoppingList);
}
