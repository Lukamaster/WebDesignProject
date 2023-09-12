package com.webprogramming.backend.service;

import com.webprogramming.backend.model.ProductCategory;

import java.util.List;

public interface ProductCategoryService {

    List<ProductCategory> listAllCategories();

    ProductCategory findByName(String name);


}
