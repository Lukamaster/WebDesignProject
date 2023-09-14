package com.webprogramming.backend.model.mapper;

import com.webprogramming.backend.model.Order;
import com.webprogramming.backend.model.ShoppingCart;
import com.webprogramming.backend.model.WebProduct;
import com.webprogramming.backend.model.dto.ShoppingCartDto;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-07-13T16:32:10+0200",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 17.0.7 (Amazon.com Inc.)"
)
@Component
public class ShoppingCartMapperImpl implements ShoppingCartMapper {

    @Override
    public ShoppingCartDto entityToDto(ShoppingCart shoppingCart) {
        if ( shoppingCart == null ) {
            return null;
        }

        ShoppingCartDto shoppingCartDto = new ShoppingCartDto();

        List<WebProduct> list = shoppingCart.getProducts();
        if ( list != null ) {
            shoppingCartDto.setProductList( new ArrayList<WebProduct>( list ) );
        }
        List<Order> list1 = shoppingCart.getOrder();
        if ( list1 != null ) {
            shoppingCartDto.setOrders( new ArrayList<Order>( list1 ) );
        }
        shoppingCartDto.setId( shoppingCart.getId() );
        shoppingCartDto.setUser( shoppingCart.getUser() );
        shoppingCartDto.setStatus( shoppingCart.getStatus() );

        return shoppingCartDto;
    }

    @Override
    public ShoppingCart dtoToEntity(ShoppingCartDto shoppingCartDto) {
        if ( shoppingCartDto == null ) {
            return null;
        }

        ShoppingCart.ShoppingCartBuilder shoppingCart = ShoppingCart.builder();

        List<WebProduct> list = shoppingCartDto.getProductList();
        if ( list != null ) {
            shoppingCart.products( new ArrayList<WebProduct>( list ) );
        }
        List<Order> list1 = shoppingCartDto.getOrders();
        if ( list1 != null ) {
            shoppingCart.order( new ArrayList<Order>( list1 ) );
        }
        shoppingCart.id( shoppingCartDto.getId() );
        shoppingCart.user( shoppingCartDto.getUser() );
        shoppingCart.status( shoppingCartDto.getStatus() );

        return shoppingCart.build();
    }
}
