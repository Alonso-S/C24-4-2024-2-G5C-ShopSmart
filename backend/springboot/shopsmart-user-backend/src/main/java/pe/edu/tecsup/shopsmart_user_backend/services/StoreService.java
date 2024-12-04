package pe.edu.tecsup.shopsmart_user_backend.services;


import org.locationtech.jts.geom.Point;
import pe.edu.tecsup.shopsmart_user_backend.dtos.store.StoreCreateDTO;
import pe.edu.tecsup.shopsmart_user_backend.dtos.store.StoreDTO;
import pe.edu.tecsup.shopsmart_user_backend.dtos.store.StoreUpdateDTO;
import pe.edu.tecsup.shopsmart_user_backend.models.Store;

import java.util.List;

public interface StoreService {

    /**
     * Obtiene todas las tiendas disponibles en el sistema.
     *
     * @return Lista de DTOs de tiendas con la información básica de cada tienda.
     */
    List<StoreDTO> getAllStores();

    /**
     * Obtiene los detalles completos de una tienda específica por su ID.
     *
     * @param storeId ID de la tienda a consultar.
     * @return DTO con la información detallada de la tienda.
     */
    StoreDTO getStoreById(Long storeId);

    /**
     * Crea una nueva tienda en el sistema.
     *
     * @param storeCreateDTO DTO que contiene los datos necesarios para crear la tienda.
     * @return DTO con la información de la tienda recién creada.
     */
    StoreDTO createStore(StoreCreateDTO storeCreateDTO);

    /**
     * Actualiza la información de una tienda existente.
     *
     * @param storeId ID de la tienda a actualizar.
     * @param storeUpdateDTO DTO con los nuevos datos a aplicar en la tienda.
     * @return DTO con la tienda actualizada.
     */
    StoreDTO updateStore (Long storeId, StoreUpdateDTO storeUpdateDTO);

    /**
     * Elimina una tienda del sistema.
     *
     * @param storeId ID de la tienda a eliminar.
     */
    void deleteStore(Long storeId);

    /**
     * Encuentra las tiendas cercanas a la ubicación del usuario dentro de un radio específico.
     *
     * @param userLocation Ubicación geográfica del usuario (punto de referencia).
     * @param radius Radio de búsqueda en metros o kilómetros (según la implementación).
     * @return Lista de tiendas que se encuentran dentro del radio especificado.
     */
    List<Store> findStoresNearby(Point userLocation, double radius);
}
