package com.webprogramming.backend.web;

import com.webprogramming.backend.model.ProductCategory;
import com.webprogramming.backend.service.impl.ProductCategoryServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:3000")
public class CategoryController {

    private final ProductCategoryServiceImpl productCategoryService;

    public CategoryController(ProductCategoryServiceImpl productCategoryService) {
        this.productCategoryService = productCategoryService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<ProductCategory>> getAllProductCategories() {
        return ResponseEntity.ok(this.productCategoryService.listAllCategories());
    }


}
