package com.webprogramming.backend.service;

import com.webprogramming.backend.model.Order;
import com.webprogramming.backend.model.WebProduct;
import com.webprogramming.backend.model.dto.ProductDto;
import com.webprogramming.backend.model.dto.ProductToCartDto;
import com.webprogramming.backend.model.dto.ShoppingCartDto;
import com.webprogramming.backend.model.identity.AppUser;

import java.util.List;

public interface ShoppingCartService {
    void createShoppingCart(AppUser user);
    ShoppingCartDto getShoppingCart(Long cartId);
    List<ProductDto> getCartProducts(Long cartId);
    void addProductToCart(ProductToCartDto dto);
    void removeProductFromCart(Long productId, Long cartId);
}
