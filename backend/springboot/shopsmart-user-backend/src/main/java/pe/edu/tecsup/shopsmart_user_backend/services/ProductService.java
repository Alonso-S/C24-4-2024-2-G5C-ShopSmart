package pe.edu.tecsup.shopsmart_user_backend.services;


import org.locationtech.jts.geom.Point;
import pe.edu.tecsup.shopsmart_user_backend.dtos.ComparisonResultDTO;
import pe.edu.tecsup.shopsmart_user_backend.dtos.product.*;

import java.util.List;

public interface ProductService {

    /**
     * Obtiene una lista de todos los productos disponibles en el sistema.
     * Este método devuelve todos los productos sin ningún filtro o paginación.
     *
     * @return Una lista de objetos {@link ProductDTO} representando todos los productos disponibles.
     */
    List<ProductDTO> getAllProducts();

    /**
     * Obtiene los detalles de un producto específico mediante su ID.
     * Si el producto no existe, se lanzará una excepción.
     *
     * @param productId ID del producto que se desea obtener.
     * @return Un objeto {@link ProductDTO} que contiene los detalles del producto.
     */
    ProductDTO getProductById(Long productId);

    /**
     * Crea un nuevo producto en el sistema.
     * Los detalles del producto a crear deben ser proporcionados en el DTO {@link ProductCreateDTO}.
     * Después de crear el producto, se devuelve el DTO con los datos del nuevo producto.
     *
     * @param productCreateDTO DTO que contiene la información necesaria para crear el producto.
     * @return El {@link ProductDTO} correspondiente al producto recién creado.
     */
    ProductDTO createProduct(ProductCreateDTO productCreateDTO);

    /**
     * Actualiza un producto existente en el sistema.
     * Los detalles a actualizar deben ser proporcionados en el DTO {@link ProductUpdateDTO}.
     *
     * @param productId ID del producto que se desea actualizar.
     * @param productUpdateDTO DTO que contiene los nuevos valores para el producto.
     * @return El {@link ProductDTO} correspondiente al producto actualizado.
     */
    ProductDTO updateProduct(Long productId, ProductUpdateDTO productUpdateDTO);

    /**
     * Elimina un producto del sistema.
     * Este método eliminará el producto permanentemente, por lo que debe usarse con cuidado.
     *
     * @param productId ID del producto que se desea eliminar.
     */
    void deleteProduct(Long productId);

    /**
     * Encuentra productos cercanos a la ubicación proporcionada por el usuario.
     * Este método considera la distancia en un radio determinado en kilómetros.
     *
     * @param userLocation La ubicación del usuario como un objeto {@link Point}, que representa las coordenadas geográficas.
     * @param radius El radio en kilómetros dentro del cual se buscan los productos disponibles.
     * @return Una lista de objetos {@link ProductNearbyDTO} que representan los productos cercanos disponibles dentro del radio especificado.
     */
    List<ProductNearbyDTO> findProductsNearby(Point userLocation, double radius);

    /**
     * Compara los precios de un producto en varias tiendas cercanas a la ubicación del usuario.
     *
     * @param productId El ID del producto.
     * @param userLocation La ubicación del usuario para buscar las tiendas cercanas.
     * @param radius El radio en el que se buscarán las tiendas cercanas.
     * @return Una lista de comparaciones de precios con la información de las tiendas.
     */
    List<ProductPriceComparisonDTO> comparePricesInStores(Long productId, Point userLocation, double radius);


    /**
     * Compara los precios de un producto en varias tiendas dentro de un rango de precios y término de búsqueda.
     *
     * @param searchTerm Término de búsqueda para filtrar productos.
     * @param minPrice El precio mínimo para filtrar productos.
     * @param maxPrice El precio máximo para filtrar productos.
     * @return Lista de resultados de comparación con el precio más bajo.
     */
    List<ComparisonResultDTO> compareProducts(String searchTerm, Double minPrice, Double maxPrice);

    /**
     * Sugerir productos alternativos dentro de un rango de precio.
     *
     * @param searchTerm Término de búsqueda para filtrar productos.
     * @param maxPrice El precio máximo para filtrar productos.
     * @return Lista de productos alternativos dentro del rango de precio.
     */
    List<ComparisonResultDTO> suggestAlternatives(String searchTerm, Double maxPrice);

}



