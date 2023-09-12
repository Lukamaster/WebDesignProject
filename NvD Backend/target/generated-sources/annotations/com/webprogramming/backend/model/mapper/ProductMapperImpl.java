package com.webprogramming.backend.model.mapper;

import com.webprogramming.backend.model.ProductCategory;
import com.webprogramming.backend.model.WebProduct;
import com.webprogramming.backend.model.dto.ProductDto;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-07-13T16:32:10+0200",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 17.0.7 (Amazon.com Inc.)"
)
@Component
public class ProductMapperImpl implements ProductMapper {

    @Override
    public ProductDto entityToDto(WebProduct product) {
        if ( product == null ) {
            return null;
        }

        ProductDto productDto = new ProductDto();

        productDto.setId( product.getId() );
        productDto.setProductName( product.getProductName() );
        productDto.setProductCode( product.getProductCode() );
        productDto.setPrice( product.getPrice() );
        productDto.setProductCategoryName( productProductCategoryCategoryName( product ) );
        productDto.setProductBrand( product.getProductBrand() );
        productDto.setProductDescription( product.getProductDescription() );
        productDto.setSpecifications( product.getSpecifications() );
        productDto.setDeliveryLocation( product.getDeliveryLocation() );

        return productDto;
    }

    private String productProductCategoryCategoryName(WebProduct webProduct) {
        if ( webProduct == null ) {
            return null;
        }
        ProductCategory productCategory = webProduct.getProductCategory();
        if ( productCategory == null ) {
            return null;
        }
        String categoryName = productCategory.getCategoryName();
        if ( categoryName == null ) {
            return null;
        }
        return categoryName;
    }
}
