package com.webprogramming.backend.stripe.service;

import com.stripe.exception.StripeException;
import com.stripe.model.Price;
import com.webprogramming.backend.model.WebProduct;
import com.webprogramming.backend.stripe.PaymentDTO;

public interface StripeService {

    String executePayment(PaymentDTO paymentDTO) throws StripeException;

    Price createStripeProduct(WebProduct webProduct) throws StripeException;
}
