package com.webprogramming.backend.web;

import com.webprogramming.backend.model.dto.ProductDto;
import com.webprogramming.backend.model.dto.ProductToCartDto;
import com.webprogramming.backend.model.dto.ShoppingCartDto;
import com.webprogramming.backend.service.ShoppingCartService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@SecurityRequirement(name = "securityScheme")
@CrossOrigin(origins = "http://localhost:3000")
public class ShoppingCartController {

    private final ShoppingCartService shoppingCartService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getCart(@PathVariable Long id){
//        try{
            ShoppingCartDto shoppingCart = shoppingCartService.getShoppingCart(id);
            return ResponseEntity.ok(shoppingCart);
//        }catch (Exception e){
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
    }

    @PutMapping("/add-product")
    public ResponseEntity<HttpStatus> addProductToCart(@RequestBody ProductToCartDto dto){
        try{
            shoppingCartService.addProductToCart(dto);
            return ResponseEntity.ok((HttpStatus.NO_CONTENT));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/remove-product/{id}")
    public ResponseEntity<HttpStatus> removeProduct(@PathVariable Long id, @RequestParam Long productId){
        try{
            shoppingCartService.removeProductFromCart(productId,id);
            return ResponseEntity.ok((HttpStatus.NO_CONTENT));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/get-products/{id}")
    public ResponseEntity<List<ProductDto>> getProductsFromCart(@PathVariable Long id){
        return ResponseEntity.ok(shoppingCartService.getCartProducts(id));
    }

}
