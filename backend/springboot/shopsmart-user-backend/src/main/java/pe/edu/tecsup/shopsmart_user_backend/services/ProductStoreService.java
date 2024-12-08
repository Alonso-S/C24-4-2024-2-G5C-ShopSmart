package pe.edu.tecsup.shopsmart_user_backend.services;


import pe.edu.tecsup.shopsmart_user_backend.dtos.product_store.ProductInStoreDTO;
import pe.edu.tecsup.shopsmart_user_backend.dtos.product_store.ProductInStoreUpdateDTO;
import pe.edu.tecsup.shopsmart_user_backend.models.Product;

import java.util.List;
import java.util.Set;

public interface ProductStoreService {

    /**
     * Obtiene todos los productos y su relación con las tiendas.
     *
     * @return Lista de productos en tiendas.
     */
    List<ProductInStoreDTO> getAllProductsInStore(Long storeId);


    ProductInStoreDTO getProductInStore(Long storeId, Long productId);


    Set<ProductInStoreDTO> addProductsToStoreInventory(Long storeId, Set<ProductInStoreDTO> productDtos);


    ProductInStoreDTO updateProductInStore(Long storeId, Long productStoreId, ProductInStoreUpdateDTO dto);


    void deleteProductInStore(Long storeId, Long productId);


    List<ProductInStoreDTO> getProductPrices(Product product);



}
