package pe.edu.tecsup.shopsmart_user_backend.services;

import pe.edu.tecsup.shopsmart_user_backend.models.Product;
import pe.edu.tecsup.shopsmart_user_backend.models.Promotion;

import java.util.List;

public interface PromotionService {

    /**
     * Método para obtener todas las promociones activas.
     *
     * @return List de promociones activas.
     */
    List<Promotion> getActivePromotions();

    /**
     * Método para verificar si un producto está incluido en alguna promoción activa.
     *
     * @param product El producto a verificar.
     * @return Verdadero si el producto está en una promoción activa, falso si no.
     */
    boolean isProductInPromotion(Product product);

    /**
     * Método para registrar una nueva promoción.
     *
     * @param promotion La promoción que se desea registrar.
     * @return La promoción recién registrada.
     */
    Promotion registerPromotion(Promotion promotion);

    /**
     * Método para obtener las promociones asociadas a un producto.
     *
     * @param product El producto que se desea verificar.
     * @return List de promociones que aplican para ese producto.
     */
    List<Promotion> getProductPromotions(Product product);
}
