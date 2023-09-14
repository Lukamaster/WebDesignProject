package com.webprogramming.backend.model.mapper;

import com.webprogramming.backend.model.WebProduct;
import com.webprogramming.backend.model.dto.ProductDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    @Mapping(source = "id", target = "id")
    @Mapping(source = "productName", target = "productName")
    @Mapping(source = "productCode", target = "productCode")
    @Mapping(source = "price", target = "price")
    @Mapping(source = "productCategory.categoryName", target = "productCategoryName")
    @Mapping(source = "productBrand", target = "productBrand")
    @Mapping(source = "productDescription", target = "productDescription")
    @Mapping(source = "specifications", target = "specifications")
    ProductDto entityToDto(WebProduct product);
}
