package com.webprogramming.backend.repository;

import com.webprogramming.backend.model.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<ProductCategory, Long> {

    ProductCategory findByCategoryName(String name);
}
