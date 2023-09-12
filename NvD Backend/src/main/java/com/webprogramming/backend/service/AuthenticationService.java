package com.webprogramming.backend.service;

import com.webprogramming.backend.model.dto.AuthenticationRequest;
import com.webprogramming.backend.model.dto.AuthenticationResponse;
import com.webprogramming.backend.model.dto.RegisterRequest;
import org.springframework.http.HttpStatus;

public interface AuthenticationService {

    HttpStatus register(RegisterRequest request);
    AuthenticationResponse authenticate(AuthenticationRequest request);
}
