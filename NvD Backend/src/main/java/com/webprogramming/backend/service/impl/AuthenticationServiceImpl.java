package com.webprogramming.backend.service.impl;

import com.webprogramming.backend.model.Role;
import com.webprogramming.backend.model.dto.AuthenticationRequest;
import com.webprogramming.backend.model.dto.AuthenticationResponse;
import com.webprogramming.backend.model.dto.RegisterRequest;
import com.webprogramming.backend.service.AuthenticationService;
import com.webprogramming.backend.service.UserService;
import com.webprogramming.backend.model.identity.AppUser;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;

    @Override
    //@Transactional
    public HttpStatus register(RegisterRequest request) {
        try{
            userService.saveUser(request);
            return HttpStatus.ACCEPTED;
        }catch (Exception e){
            return HttpStatus.BAD_REQUEST;
        }
    }

    @Override
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        AppUser appUser = userService.findByEmail(request.getEmail());
        Role userRole = appUser.getRole();
        String userName = appUser.getFirstName();
        boolean isAdmin;

        if(userRole == Role.ADMIN) {
            isAdmin = true;
        }
        else {
            isAdmin = false;
        }


        String jwtToken = jwtService.generateToken(appUser);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .firstName(userName)
                .isAdmin(isAdmin)
                .build();
    }
}