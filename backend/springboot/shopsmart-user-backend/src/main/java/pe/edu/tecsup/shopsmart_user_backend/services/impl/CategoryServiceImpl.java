package pe.edu.tecsup.shopsmart_user_backend.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pe.edu.tecsup.shopsmart_user_backend.models.Category;
import pe.edu.tecsup.shopsmart_user_backend.repositories.CategoryRespository;
import pe.edu.tecsup.shopsmart_user_backend.services.CategoryService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRespository categoryRepository;

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id).orElse(null);
    }

    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    public Category updateCategory(Long id,Category category) {
        Category cat= categoryRepository.findById(id).orElseThrow(()-> new RuntimeException("Category not found"));
        cat.setName(category.getName());
        cat.setDescription(category.getDescription());
        return categoryRepository.save(cat);
    }

    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }
}
