package com.webprogramming.backend.model.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductToCartDto {
    @NotEmpty
    private Long cartId;
    @NotEmpty
    private Long productId;
    private int quantity = 1;
}
