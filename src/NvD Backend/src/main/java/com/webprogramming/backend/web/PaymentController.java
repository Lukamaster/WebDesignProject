package com.webprogramming.backend.web;

import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import com.webprogramming.backend.model.WebProduct;
import com.webprogramming.backend.model.dto.WebProductDto;
import com.webprogramming.backend.service.WebProductService;
import com.webprogramming.backend.stripe.PaymentDTO;
import com.webprogramming.backend.stripe.service.StripeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {

    private final StripeService stripeService;
    private final WebProductService webProductService;

    //@PostMapping
    public ResponseEntity<String> createPayment(@RequestBody PaymentDTO paymentDTO) throws StripeException {
        String chargeStatus = stripeService.executePayment(paymentDTO);
        return ResponseEntity.ok(chargeStatus);
    }

    @PostMapping("/createSession")
    public ResponseEntity<String> createSession(@RequestBody List<WebProductDto> webProductDtoList) throws StripeException {

        List<SessionCreateParams.LineItem> listLineItem = new ArrayList<>();

        for (WebProductDto webProduct : webProductDtoList) {


            WebProduct currentProd = webProductService.findById(webProduct.getId());
            String price = stripeService.createStripeProduct(currentProd).getId();

            SessionCreateParams.LineItem lineItem = SessionCreateParams.LineItem.builder()
                    .setQuantity(webProduct.getQuantity())
                    .setPrice(price)
                    .build();
            listLineItem.add(lineItem);
        }

        // Need to add stripe user/customer object to each session for logging in users
        SessionCreateParams sessionParams =
                SessionCreateParams.builder()
                        .setMode(SessionCreateParams.Mode.PAYMENT)
                        .setSuccessUrl("http://localhost:3000/" + "?success=true")
                        .setCancelUrl("http://localhost:3000/" + "?canceled=true")
                        .addAllLineItem(listLineItem)
                        .build();

        return ResponseEntity.ok(Session.create(sessionParams).getUrl());
    }
}
