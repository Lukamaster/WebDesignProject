package com.webprogramming.backend.service.impl;

import com.webprogramming.backend.model.Order;
import com.webprogramming.backend.model.ShoppingCart;
import com.webprogramming.backend.model.WebProduct;
import com.webprogramming.backend.model.dto.ProductDto;
import com.webprogramming.backend.model.dto.ProductToCartDto;
import com.webprogramming.backend.model.dto.ShoppingCartDto;
import com.webprogramming.backend.model.exceptions.CartNotFoundException;
import com.webprogramming.backend.model.identity.AppUser;
import com.webprogramming.backend.model.mapper.ProductMapper;
import com.webprogramming.backend.model.mapper.ShoppingCartMapper;
import com.webprogramming.backend.repository.ShoppingCartRepository;
import com.webprogramming.backend.service.ShoppingCartService;
import com.webprogramming.backend.service.WebProductService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ShoppingCartServiceImpl implements ShoppingCartService {

    private final ShoppingCartRepository repository;
    private final ShoppingCartMapper shoppingCartMapper;
    private final WebProductService productService;
    private final ProductMapper productMapper;

    @Override
    public void createShoppingCart(AppUser user) {
        ShoppingCart shoppingCart = ShoppingCart.builder().status(true).user(user).build();
        repository.save(shoppingCart);
    }

    @Override
    public ShoppingCartDto getShoppingCart(Long cartId) {
        ShoppingCart cart = getCartFromRepo(cartId);
        return shoppingCartMapper.entityToDto(cart);
    }

    @Override
    public List<ProductDto> getCartProducts(Long cartId) {
        ShoppingCartDto shoppingCart = getShoppingCart(cartId);
        return shoppingCart.getProductList().stream().map(productMapper::entityToDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void addProductToCart(ProductToCartDto dto) {
        ShoppingCart cart = getCartFromRepo(dto.getCartId());
        WebProduct product = productService.findById(dto.getProductId());
        for (int i=0;i<dto.getQuantity();i++){
            cart.getProducts().add(product);
        }
        repository.save(cart);
    }

    @Override
    @Transactional
    public void removeProductFromCart(Long productId, Long cartId) {
        ShoppingCart cart = getCartFromRepo(cartId);
        WebProduct product = productService.findById(productId);
        cart.getProducts().remove(product);
        repository.save(cart);
    }

    private ShoppingCart getCartFromRepo(Long cartId) {
        if (cartId == null){
            throw new IllegalStateException("Cart id is null");
        }
        Optional<ShoppingCart> cart = repository.findById(cartId);
        if (cart.isEmpty()) {
            throw new CartNotFoundException();
        }
        return cart.get();
    }
}
