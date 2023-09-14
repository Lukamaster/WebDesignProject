package com.webprogramming.backend.service.impl;


import com.webprogramming.backend.model.ProductCategory;
import com.webprogramming.backend.repository.CategoryRepository;
import com.webprogramming.backend.service.ProductCategoryService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductCategoryServiceImpl implements ProductCategoryService {

    private final CategoryRepository categoryRepository;

    public ProductCategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<ProductCategory> listAllCategories() {
        return this.categoryRepository.findAll();
    }

    @Override
    public ProductCategory findByName(String name) {
        return this.categoryRepository.findByCategoryName(name);
    }
}
