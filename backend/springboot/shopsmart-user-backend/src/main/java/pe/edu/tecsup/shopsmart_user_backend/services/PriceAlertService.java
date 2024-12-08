package pe.edu.tecsup.shopsmart_user_backend.services;

import pe.edu.tecsup.shopsmart_user_backend.models.PriceAlert;
import pe.edu.tecsup.shopsmart_user_backend.models.Product;
import pe.edu.tecsup.shopsmart_user_backend.models.User;

import java.util.List;

public interface PriceAlertService {

    /**
     * Método para verificar si el precio de algún producto en las listas de compras del usuario ha bajado.
     * Si se encuentra una reducción de precio, se genera una alerta para el usuario.
     *
     * @param user El usuario para el que se verifican las alertas.
     */
    void checkPriceAlerts(User user);

    /**
     * Método para recuperar todas las alertas pendientes de un usuario.
     *
     * @param user El usuario cuyas alertas se deben recuperar.
     * @return List de alertas pendientes para el usuario.
     */
    List<PriceAlert> getPendingAlerts(User user);

    /**
     * Método para marcar una alerta como leída por el usuario.
     *
     * @param alertId El ID de la alerta a marcar como leída.
     */
    void markAlertAsRead(Long alertId);

    /**
     * Método para generar una nueva alerta de precio.
     *
     * @param user El usuario al que se le generará la alerta.
     * @param product El producto cuyo precio ha bajado.
     * @param message El mensaje que se enviará con la alerta.
     */
    void createPriceAlert(User user, Product product, String message);

}
