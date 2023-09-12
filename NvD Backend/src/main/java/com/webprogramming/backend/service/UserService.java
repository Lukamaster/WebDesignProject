package com.webprogramming.backend.service;

import com.webprogramming.backend.model.identity.AppUser;
import com.webprogramming.backend.model.dto.AppUserDetailsDto;
import com.webprogramming.backend.model.dto.RegisterRequest;

import java.util.List;


public interface UserService {

    AppUser findByEmail(String email);
    AppUser saveUser(RegisterRequest request);
    List<AppUser> getAllRegisteredUsers();
    AppUserDetailsDto getUserById(String id);
}
