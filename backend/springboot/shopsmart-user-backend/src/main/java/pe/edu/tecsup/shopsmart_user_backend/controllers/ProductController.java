package pe.edu.tecsup.shopsmart_user_backend.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.tecsup.shopsmart_user_backend.dtos.product.*;
import pe.edu.tecsup.shopsmart_user_backend.services.ProductService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;


    @GetMapping
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @PostMapping
    public ResponseEntity<ProductDTO> createProduct(@RequestBody ProductCreateDTO productCreateDTO) {
        ProductDTO product = productService.createProduct(productCreateDTO);
        return new ResponseEntity<>(product, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable Long id, @RequestBody @Valid ProductUpdateDTO productUpdateDTO) {
        ProductDTO product = productService.updateProduct(id, productUpdateDTO);
        return ResponseEntity.ok(product);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }


    @GetMapping("/nearby")
    public ResponseEntity<List<ProductNearbyDTO>> getNearbyProducts(
            @RequestParam double latitude,
            @RequestParam double longitude,
            @RequestParam double radius
    ) {
        GeometryFactory geometryFactory = new GeometryFactory();
        Point userLocation = geometryFactory.createPoint(new Coordinate(longitude, latitude));
        userLocation.setSRID(4326);
        List<ProductNearbyDTO> nearbyProducts = productService.findProductsNearby(userLocation, radius);
        return ResponseEntity.ok(nearbyProducts);
    }


    @GetMapping("/compare-prices")
    public ResponseEntity<List<ProductPriceComparisonDTO>> compareProductPrices(
            @RequestParam Long productId,
            @RequestParam double latitude,
            @RequestParam double longitude,
            @RequestParam double radius) {

        GeometryFactory geometryFactory = new GeometryFactory();
        Point userLocation = geometryFactory.createPoint(new Coordinate(longitude, latitude));
        userLocation.setSRID(4326);
        List<ProductPriceComparisonDTO> priceComparisons = productService.comparePricesInStores(productId, userLocation, radius);
        return ResponseEntity.ok(priceComparisons);
    }

}

