package com.webprogramming.backend.service.impl;

import com.webprogramming.backend.model.ProductCategory;
import com.webprogramming.backend.model.WebProduct;
import com.webprogramming.backend.model.exceptions.ProductIDNotFoundException;
import com.webprogramming.backend.repository.CategoryRepository;
import com.webprogramming.backend.repository.WebProductRepository;
import com.webprogramming.backend.service.WebProductService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WebProductServiceImpl implements WebProductService {

    private final WebProductRepository webProductRepository;
    private final CategoryRepository categoryRepository;

    public WebProductServiceImpl(WebProductRepository webProductRepository, CategoryRepository categoryRepository) {
        this.webProductRepository = webProductRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<WebProduct> listAllProducts() {
        return webProductRepository.findAll();
    }

    @Override
    public List<WebProduct> listByCategory(String category) {
        ProductCategory productCategory = categoryRepository.findByCategoryName(category);
        return webProductRepository.findWebProductsByProductCategory(productCategory);
    }

    @Override
    public List<WebProduct> listByBrand(String brand) {
        return webProductRepository.findWebProductsByProductBrand(brand);
    }

    @Override
    public WebProduct findById(Long id) {
        return webProductRepository.findById(id).orElseThrow(ProductIDNotFoundException::new);
    }

    @Override
    public WebProduct findByName(String name) {
        return webProductRepository.findWebProductByProductName(name);
    }

    @Override
    @Transactional
    public WebProduct createProduct(String name, String code, Integer price, ProductCategory category, String brand, String deliveryLocation, String description, String specifications) {
        WebProduct newProduct = new WebProduct(name, code, price, category, brand, deliveryLocation, description, specifications);
        return webProductRepository.save(newProduct);
    }

    @Override
    @Transactional
    public WebProduct updateProduct(Long id, String name, String code, Integer price, ProductCategory category, String brand, String deliveryLocation, String description, String specifications) {
        WebProduct editedProduct = webProductRepository.findById(id).orElseThrow(ProductIDNotFoundException::new);
        editedProduct.setProductName(name);
        editedProduct.setProductCode(code);
        editedProduct.setPrice(price);
        editedProduct.setProductCategory(category);
        editedProduct.setProductBrand(brand);
        editedProduct.setDeliveryLocation(deliveryLocation);
        editedProduct.setProductDescription(description);
        editedProduct.setSpecifications(specifications);
        return editedProduct;
    }

    @Override
    @Transactional
    public WebProduct deleteProduct(Long id) {
        WebProduct webProduct = this.findById(id);
        this.webProductRepository.delete(webProduct);
        return webProduct;
    }
}
