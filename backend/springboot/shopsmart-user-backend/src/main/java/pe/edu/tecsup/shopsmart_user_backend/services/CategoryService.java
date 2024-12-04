package pe.edu.tecsup.shopsmart_user_backend.services;

import pe.edu.tecsup.shopsmart_user_backend.models.Category;

import java.util.List;

public interface CategoryService {

    List<Category> getAllCategories();
    Category getCategoryById(Long id);
    Category createCategory(Category category);
    Category updateCategory(Long id, Category category);
    void deleteCategory(Long id);

}
