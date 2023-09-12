package com.webprogramming.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WebProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String productName;
    private String productCode;
    private Integer price;
    @ManyToOne
    private ProductCategory productCategory;
    private String productBrand;
    private String deliveryLocation;
    private String productDescription;
    private String specifications;

    @ManyToMany(mappedBy = "products")
    List<ShoppingCart> carts;

    public WebProduct(String name, String code, Integer price, ProductCategory category, String brand, String deliveryLocation, String description, String specifications) {
        this.productName = name;
        this.productCode = code;
        this.productCategory = category;
        this.productBrand = brand;
        this.deliveryLocation = deliveryLocation;
        this.productDescription = description;
        this.specifications = specifications;
    }
}
