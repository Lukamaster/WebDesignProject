package com.webprogramming.backend.model.mapper;

import com.webprogramming.backend.model.ShoppingCart;
import com.webprogramming.backend.model.dto.ShoppingCartDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ShoppingCartMapper {

    @Mapping(source = "products", target = "productList")
    @Mapping(source = "order", target = "orders")
    ShoppingCartDto entityToDto(ShoppingCart shoppingCart);

    @Mapping(source = "productList", target = "products")
    @Mapping(source = "orders", target = "order")
    ShoppingCart dtoToEntity(ShoppingCartDto shoppingCartDto);
}
