package com.webprogramming.backend.service;

import com.webprogramming.backend.model.ProductCategory;
import com.webprogramming.backend.model.WebProduct;

import java.util.List;

public interface WebProductService {

    List<WebProduct> listAllProducts();

    List<WebProduct> listByCategory(String category);

    List<WebProduct> listByBrand(String brand);

    WebProduct findById(Long id);
    WebProduct findByName(String name);

    WebProduct createProduct(String name, String code, Integer price, ProductCategory category, String brand, String deliveryLocation, String description, String specifications);

    WebProduct updateProduct(Long id, String name, String code, Integer price, ProductCategory category, String brand, String deliveryLocation, String description, String specifications);

    WebProduct deleteProduct(Long id);

}
