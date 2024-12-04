package pe.edu.tecsup.shopsmart_user_backend.services;

import pe.edu.tecsup.shopsmart_user_backend.models.Brand;

import java.util.List;

public interface BrandService {
    List<Brand> getAllBrands();
    Brand getBrandById(Long id);
    Brand createBrand(Brand brand);
    Brand updateBrand(Long id, Brand brand);
    void deleteBrand(Long id);

}
