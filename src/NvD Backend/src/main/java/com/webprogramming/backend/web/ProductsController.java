package com.webprogramming.backend.web;

import com.webprogramming.backend.model.ProductCategory;
import com.webprogramming.backend.model.WebProduct;
import com.webprogramming.backend.model.dto.ProductDto;
import com.webprogramming.backend.service.ProductCategoryService;
import com.webprogramming.backend.service.WebProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin("http://localhost:3000")
public class ProductsController {

    private final WebProductService webProductService;
    private final ProductCategoryService productCategoryService;

    public ProductsController(WebProductService webProductService, ProductCategoryService productCategoryService) {
        this.webProductService = webProductService;
        this.productCategoryService = productCategoryService;
    }


    @GetMapping("/{categoryName}")
    public ResponseEntity<List<WebProduct>> showProductsByCategory(@PathVariable String categoryName) {
        return ResponseEntity.ok(webProductService.listByCategory(categoryName));
    }

    @GetMapping("/all")
    public ResponseEntity<List<WebProduct>> showAllProducts() {
        return  ResponseEntity.ok(webProductService.listAllProducts());
    }

    @GetMapping("/view/{id}")
    public ResponseEntity<WebProduct> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(webProductService.findById(id));
    }

    @GetMapping("/search/{searchQuery}")
    public ResponseEntity<WebProduct> searchProduct(@PathVariable String searchQuery) {
        return ResponseEntity.ok(webProductService.findByName(searchQuery));
    }

    @PostMapping("/add")
    public ResponseEntity<WebProduct> addProduct(@RequestBody ProductDto productDto) {
        WebProduct newProduct = this.webProductService.createProduct(productDto.getProductName(),
                productDto.getProductCode(),
                productDto.getPrice(),
                this.productCategoryService.findByName(productDto.getProductCategoryName()),
                productDto.getProductBrand(),
                productDto.getDeliveryLocation(),
                productDto.getProductDescription(),
                productDto.getSpecifications());
        return ResponseEntity.ok(newProduct);
    }

    @PostMapping("/update/{id}")
    public ResponseEntity<WebProduct> updateProduct(@PathVariable Long id,
                                                    @RequestBody String name,
                                                    @RequestBody String code,
                                                    @RequestBody Integer price,
                                                    @RequestBody ProductCategory category,
                                                    @RequestBody String brand,
                                                    @RequestBody String deliveryLocation,
                                                    @RequestBody String description,
                                                    @RequestBody String specifications) {
        WebProduct updatedProduct = this.webProductService.updateProduct(id, name, code, price, category, brand, deliveryLocation, description, specifications);
        return ResponseEntity.ok(updatedProduct);
    }
}
