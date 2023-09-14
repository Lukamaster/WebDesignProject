package com.webprogramming.backend.web;

import com.webprogramming.backend.model.dto.AuthenticationRequest;
import com.webprogramming.backend.model.dto.AuthenticationResponse;
import com.webprogramming.backend.model.dto.RegisterRequest;
import com.webprogramming.backend.service.AuthenticationService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@SecurityRequirement(name = "securityScheme")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<HttpStatus> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok().body(authenticationService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok().body(authenticationService.authenticate(request));

    }
}
