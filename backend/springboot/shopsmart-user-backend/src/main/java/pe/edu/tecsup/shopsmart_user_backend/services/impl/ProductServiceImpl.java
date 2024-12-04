package pe.edu.tecsup.shopsmart_user_backend.services.impl;


import lombok.RequiredArgsConstructor;
import org.locationtech.jts.geom.Point;
import org.springframework.stereotype.Service;
import pe.edu.tecsup.shopsmart_user_backend.dtos.ComparisonResultDTO;
import pe.edu.tecsup.shopsmart_user_backend.dtos.product.*;
import pe.edu.tecsup.shopsmart_user_backend.exceptions.StoresNotFoundException;
import pe.edu.tecsup.shopsmart_user_backend.exceptions.BrandNotFoundException;
import pe.edu.tecsup.shopsmart_user_backend.exceptions.CategoryNotFoundException;
import pe.edu.tecsup.shopsmart_user_backend.exceptions.ProductNotFoundException;
import pe.edu.tecsup.shopsmart_user_backend.models.*;
import pe.edu.tecsup.shopsmart_user_backend.repositories.*;
import pe.edu.tecsup.shopsmart_user_backend.services.ProductService;
import pe.edu.tecsup.shopsmart_user_backend.services.StoreService;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {


    private static final String PRODUCT_NOT_FOUND = "Producto no encontrado";
    private static final String CATEGORY_NOT_FOUND = "Categoría no encontrada";
    private static final String BRAND_NOT_FOUND = "Marca no encontrada";
    private static final String STORES_NOT_FOUND = "No se encontraron tiendas cercanas";


    private final ProductRepository productRepository;
    private final BrandRepository brandRepository;
    private final CategoryRespository categoryRespository;
    private final StoreService storeService;
    private final ProductStoreRepository productStoreRepository;

    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll().stream()
                .map(ProductDTO::new)
                .toList();
    }

    public ProductDTO getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(PRODUCT_NOT_FOUND));
        return new ProductDTO(product);
    }

    public ProductDTO createProduct(ProductCreateDTO dto) {
        Brand brand = brandRepository.findById(dto.brandId())
                .orElseThrow(()->new BrandNotFoundException(BRAND_NOT_FOUND));

        Category category = categoryRespository.findById(dto.categoryId())
                .orElseThrow(()->new CategoryNotFoundException(CATEGORY_NOT_FOUND));

        Product product = Product.builder()
                .name(dto.name())
                .description(dto.description())
                .image(dto.image())
                .brand(brand)
                .category(category)
                .build();

        Product savedProduct = productRepository.save(product);

       return new ProductDTO(savedProduct);
    }

    public ProductDTO updateProduct(Long id, ProductUpdateDTO dto) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(PRODUCT_NOT_FOUND));

        Category category = categoryRespository.findById(dto.categoryId())
                .orElseThrow(()->new CategoryNotFoundException(CATEGORY_NOT_FOUND));

        Brand brand = brandRepository.findById(dto.brandId())
                .orElseThrow(()->new BrandNotFoundException(BRAND_NOT_FOUND));

        product.setName(dto.name());
        product.setDescription(dto.description());
        product.setImage(dto.image());
        product.setCategory(category);
        product.setBrand(brand);
        Product savedProduct = productRepository.save(product);
        return  new ProductDTO(savedProduct);
    }


    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(PRODUCT_NOT_FOUND));
        productRepository.delete(product);
    }

    public List<ProductNearbyDTO> findProductsNearby(Point userLocation, double radius) {
        // 1. Obtener todas las tiendas dentro del radio especificado
        List<Store> stores = storeService.findStoresNearby(userLocation, radius);
        if (stores.isEmpty()) {
            throw new StoresNotFoundException(STORES_NOT_FOUND); // Excepción clara si no hay tiendas
        }

        List<ProductNearbyDTO> nearbyProducts = new ArrayList<>();

        // 2. Iterar sobre las tiendas para obtener los productos disponibles
        for (Store store : stores) {
            for (ProductStore productStore : store.getProductStores()) {
                // 3. Obtener la ubicación de la tienda
                Point storeLocation = store.getLocation();

                // 4. Calcular la distancia entre el usuario y la tienda usando la fórmula de Haversine
                double distance = calculateDistance(userLocation, storeLocation); // Distancia en kilómetros

                // 5. Crear el DTO con la información del producto y la tienda
                ProductNearbyDTO productDTO = new ProductNearbyDTO(
                        productStore.getProduct().getId(),
                        productStore.getProduct().getName(),
                        productStore.getPrice(),
                        store.getId(),
                        store.getName(),
                        distance // Asignar la distancia
                );

                // 6. Agregar el DTO de producto a la lista
                nearbyProducts.add(productDTO);
            }
        }

        // 7. Ordenar por distancia (storeLocation) y precio (price)
        nearbyProducts.sort(Comparator.comparing(ProductNearbyDTO::storeLocation)
                .thenComparing(ProductNearbyDTO::price));

        return nearbyProducts;
    }



    public List<ProductPriceComparisonDTO> comparePricesInStores(Long productId, Point userLocation, double radius) {
        // 1. Obtener el producto por ID
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException(PRODUCT_NOT_FOUND));

        // 2. Obtener todas las tiendas cercanas
        List<Store> stores = storeService.findStoresNearby(userLocation, radius);
        if (stores.isEmpty()) {
            throw new StoresNotFoundException(STORES_NOT_FOUND);
        }

        List<ProductPriceComparisonDTO> priceComparisons = new ArrayList<>();

        // 3. Iterar sobre las tiendas y obtener los precios de los productos
        for (Store store : stores) {
            for (ProductStore productStore : store.getProductStores()) {
                if (productStore.getProduct().getId().equals(productId)) {
                    // 4. Calcular la distancia entre la tienda y el usuario
                    double distance = calculateDistance(userLocation, store.getLocation());

                    // 5. Crear el DTO de comparación de precios
                    ProductPriceComparisonDTO comparisonDTO = new ProductPriceComparisonDTO(
                            product.getId(),
                            product.getName(),
                            store.getId(),
                            store.getName(),
                            productStore.getPrice(),
                            productStore.getStock(),
                            productStore.getIsAvailable(),
                            distance
                    );
                    priceComparisons.add(comparisonDTO);
                }
            }
        }

        return priceComparisons;
    }




    public double calculateDistance(Point point1, Point point2) {
        // Obtener las coordenadas de latitud y longitud
        double lat1 = Math.toRadians(point1.getY()); // latitud de la primera ubicación
        double lon1 = Math.toRadians(point1.getX()); // longitud de la primera ubicación
        double lat2 = Math.toRadians(point2.getY()); // latitud de la segunda ubicación
        double lon2 = Math.toRadians(point2.getX()); // longitud de la segunda ubicación

        // Radio de la Tierra en kilómetros
        final double R = 6371.0;

        // Diferencias de latitud y longitud
        double dLat = lat2 - lat1;
        double dLon = lon2 - lon1;

        // Aplicar la fórmula de Haversine
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(lat1) * Math.cos(lat2)
                * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        // Calcular la distancia en kilómetros

        return R * c; // Retornar la distancia en kilómetros
    }


    public List<ComparisonResultDTO> compareProducts(String searchTerm, Double minPrice, Double maxPrice) {
        List<ProductStore> productStores = productStoreRepository.searchProductStores(searchTerm, minPrice, maxPrice);

        return productStores.stream()
                .sorted(Comparator.comparing(ProductStore::getPrice))  // Ordenar por precio
                .map(ps -> {
                    Product product = ps.getProduct();
                    Store store = ps.getStore();
                    Integer stock = ps.getStock(); // Obtener stock desde ProductStore

                    return new ComparisonResultDTO(
                            product.getId(),
                            product.getName(),
                            ps.getPrice(),
                            store.getName(),
                            store.getLocation(),
                            stock
                    );
                })
                .toList();
    }



    public List<ComparisonResultDTO> suggestAlternatives(String searchTerm, Double maxPrice) {
        // 1. Buscar productos en el rango de precios
        List<Product> products = productRepository.searchProducts(searchTerm, 0.0, maxPrice);

        // 2. Iterar sobre los productos y obtener sus alternativas
        return products.stream()
                .flatMap(product -> productStoreRepository.findByProductId(product.getId()).stream()) // Buscar todas las tiendas para un producto
                .map(productStore -> {
                    Product product = productStore.getProduct(); // Producto desde ProductStore
                    Store store = productStore.getStore(); // Tienda desde ProductStore
                    Integer stock = productStore.getStock(); // Stock del producto en esa tienda

                    // 3. Crear DTO con los detalles del producto, tienda, y stock
                    return new ComparisonResultDTO(
                            product.getId(),
                            product.getName(),
                            productStore.getPrice(), // Precio del producto en la tienda
                            store.getName(),
                            store.getLocation(),
                            stock // Stock disponible
                    );
                })
                .toList();
    }



}
