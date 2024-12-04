package pe.edu.tecsup.shopsmart_user_backend.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pe.edu.tecsup.shopsmart_user_backend.exceptions.BrandNotFoundException;
import pe.edu.tecsup.shopsmart_user_backend.models.Brand;
import pe.edu.tecsup.shopsmart_user_backend.repositories.BrandRepository;
import pe.edu.tecsup.shopsmart_user_backend.services.BrandService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BrandServiceImpl implements BrandService {
    private final BrandRepository brandRepository;
    public List<Brand> getAllBrands() {
         List<Brand> brands= brandRepository.findAll();
         return brands;
    }

    public Brand getBrandById(Long id) {
        Brand brand = brandRepository.findById(id).orElseThrow(()-> new BrandNotFoundException("Brand not found"));
        return brand;
    }

    public Brand createBrand(Brand brand) {
        Brand savedBrand = brandRepository.save(brand);
        return savedBrand;
    }

    public Brand updateBrand(Long id, Brand brand) {
        Brand savedBrand = brandRepository.save(brand);
        return savedBrand;
    }

    public void deleteBrand(Long id) {
        brandRepository.deleteById(id);
    }
}
