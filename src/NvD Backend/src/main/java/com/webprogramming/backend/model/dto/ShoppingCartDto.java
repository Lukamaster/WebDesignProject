package com.webprogramming.backend.model.dto;

import com.webprogramming.backend.model.Order;
import com.webprogramming.backend.model.WebProduct;
import com.webprogramming.backend.model.identity.AppUser;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShoppingCartDto {
    private Long id;
    private AppUser user;
    private Boolean status;
    private List<WebProduct> productList;
    private List<Order> orders;
}
