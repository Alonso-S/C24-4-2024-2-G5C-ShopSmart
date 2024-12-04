package pe.edu.tecsup.shopsmart_user_backend.services;


import pe.edu.tecsup.shopsmart_user_backend.dtos.product_store.ProductInStoreDTO;
import pe.edu.tecsup.shopsmart_user_backend.dtos.product_store.ProductInStoreUpdateDTO;
import java.util.List;
import java.util.Set;

public interface ProductStoreService {

    /**
     * Obtiene todos los productos y su relación con las tiendas.
     *
     * @return Lista de productos en tiendas.
     */
    List<ProductInStoreDTO> getAllProductsInStore(Long storeId);

    /**
     * Obtiene los detalles de un producto en una tienda específica.
     *
     * @param productStoreId ID de la relación producto-tienda.
     * @return Detalles de la relación producto-tienda.
     */
    ProductInStoreDTO getProductInStore(Long storeId, Long productId);

    /**
     * Agrega un nuevo producto a una tienda con su stock, precio y disponibilidad.
     *
     * @param productStoreCreateDTO DTO con los datos para crear la relación producto-tienda.
     * @return La relación producto-tienda creada.
     */
    Set<ProductInStoreDTO> addProductsToStoreInventory(Long storeId, Set<ProductInStoreDTO> productDtos);

    /**
     * Actualiza un producto en una tienda (por ejemplo, precio, stock y disponibilidad).
     *
     * @param productStoreId ID de la relación producto-tienda.
     * @param productStoreUpdateDTO DTO con los datos a actualizar.
     * @return La relación producto-tienda actualizada.
     */
    ProductInStoreDTO updateProductInStore(Long storeId, Long productStoreId, ProductInStoreUpdateDTO dto);

    /**
     * Elimina un producto de una tienda.
     *
     * @param productStoreId ID de la relación producto-tienda.
     */
    void deleteProductInStore(Long storeId, Long productId);

}
