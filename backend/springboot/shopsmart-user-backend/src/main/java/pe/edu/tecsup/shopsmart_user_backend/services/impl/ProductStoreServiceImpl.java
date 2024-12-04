package pe.edu.tecsup.shopsmart_user_backend.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pe.edu.tecsup.shopsmart_user_backend.dtos.product_store.ProductInStoreDTO;
import pe.edu.tecsup.shopsmart_user_backend.dtos.product_store.ProductInStoreUpdateDTO;
import pe.edu.tecsup.shopsmart_user_backend.exceptions.ProductNotFoundException;
import pe.edu.tecsup.shopsmart_user_backend.exceptions.ProductStoreNotFoundException;
import pe.edu.tecsup.shopsmart_user_backend.exceptions.StoreNotFoundException;
import pe.edu.tecsup.shopsmart_user_backend.models.Product;
import pe.edu.tecsup.shopsmart_user_backend.models.ProductStore;
import pe.edu.tecsup.shopsmart_user_backend.models.ProductStoreId;
import pe.edu.tecsup.shopsmart_user_backend.models.Store;
import pe.edu.tecsup.shopsmart_user_backend.repositories.ProductRepository;
import pe.edu.tecsup.shopsmart_user_backend.repositories.ProductStoreRepository;
import pe.edu.tecsup.shopsmart_user_backend.repositories.StoreRepository;
import pe.edu.tecsup.shopsmart_user_backend.services.ProductStoreService;

import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ProductStoreServiceImpl implements ProductStoreService {
    private final ProductStoreRepository productStoreRepository;
    private final ProductRepository productRepository;
    private final StoreRepository storeRepository;
    private static final String PRODUCT_NOT_FOUND = "Product not found with id: ";
    private static final String STORE_NOT_FOUND = "Store not found with id: ";
    private static final String PRODUCT_STORE_NOT_FOUND = "La relación Producto-Tienda no existe con id: ";


    public List<ProductInStoreDTO> getAllProductsInStore(Long storeId) {
        boolean storeExists = storeRepository.existsById(storeId);
        if(!storeExists){
            throw new StoreNotFoundException(STORE_NOT_FOUND + storeId);
        }

        List<ProductStore> products = productStoreRepository.findByStoreId(storeId);

        return products.stream().map(ProductInStoreDTO::new).toList();
    }

    public ProductInStoreDTO getProductInStore(Long storeId, Long productId) {
        ProductStoreId id = ProductStoreId.builder()
                .storeId(storeId)
                .productId(productId)
                .build();

        ProductStore product = productStoreRepository.findById(id).orElseThrow(()->new ProductStoreNotFoundException(PRODUCT_STORE_NOT_FOUND));

        return new ProductInStoreDTO(product);
    }


    public Set<ProductInStoreDTO> addProductsToStoreInventory(Long storeId, Set<ProductInStoreDTO> productDtos) {
        Store store = storeRepository.findById(storeId)
                .orElseThrow(() -> new StoreNotFoundException(STORE_NOT_FOUND + storeId));

        Set<Long> productIds = productDtos.stream()
                .map(ProductInStoreDTO::productId)
                .collect(Collectors.toSet());
        Map<Long, Product> productsMap = productRepository.findAllById(productIds)
                .stream()
                .collect(Collectors.toMap(Product::getId, product -> product));

        List<ProductStore> productStores = new ArrayList<>();

        for (ProductInStoreDTO dto : productDtos) {
            Product product = productsMap.get(dto.productId());
            if (product == null) {
                throw new ProductNotFoundException(PRODUCT_NOT_FOUND + dto.productId());
            }

            ProductStore productStore = ProductStore.builder()
                    .stock(dto.stock())
                    .price(dto.price())
                    .isAvailable(dto.isAvailable())
                    .product(product)
                    .store(store)
                    .build();

            productStores.add(productStore);
        }
        List<ProductStore> savedProductStores = productStoreRepository.saveAll(productStores);

        return savedProductStores.stream()
                .map(ProductInStoreDTO::new)
                .collect(Collectors.toSet());
    }


    public ProductInStoreDTO updateProductInStore(
            Long storeId,
            Long productId,
            ProductInStoreUpdateDTO dto) {

        boolean storeExists = storeRepository.existsById(storeId);
        if(!storeExists){
            throw new StoreNotFoundException(STORE_NOT_FOUND + storeId);
        }

        ProductStoreId id = ProductStoreId.builder()
                .storeId(storeId)
                .productId(productId)
                .build();

        ProductStore product = productStoreRepository.findById(id).orElseThrow(()->new ProductStoreNotFoundException(PRODUCT_STORE_NOT_FOUND));
        product.setPrice(dto.price());
        product.setStock(dto.stock());
        product.setIsAvailable(dto.isAvailable());

        ProductStore savedProduct =  productStoreRepository.save(product);

        return new ProductInStoreDTO(savedProduct);
    }





    public void deleteProductInStore(Long storeId, Long productId) {
        boolean storeExists = storeRepository.existsById(storeId);
        if(!storeExists){
            throw new StoreNotFoundException(STORE_NOT_FOUND + storeId);
        }

        ProductStoreId id = ProductStoreId.builder()
                .productId(productId)
                .storeId(storeId)
                .build();

        Optional<ProductStore> productStore = productStoreRepository.findById(id);
        if (productStore.isPresent()) {
            productStoreRepository.deleteById(id);
        } else {
            throw new ProductStoreNotFoundException(PRODUCT_STORE_NOT_FOUND);
        }
    }

}
