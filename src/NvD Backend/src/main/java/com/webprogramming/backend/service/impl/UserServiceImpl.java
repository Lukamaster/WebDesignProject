package com.webprogramming.backend.service.impl;

import com.webprogramming.backend.model.identity.AppUser;
import com.webprogramming.backend.model.Role;
import com.webprogramming.backend.model.dto.AppUserDetailsDto;
import com.webprogramming.backend.model.dto.RegisterRequest;
import com.webprogramming.backend.model.mapper.AppUserMapper;
import com.webprogramming.backend.repository.UserRepository;
import com.webprogramming.backend.service.ShoppingCartService;
import com.webprogramming.backend.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Primary
@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService, UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AppUserMapper userMapper;
    private final ShoppingCartService shoppingCartService;

    @Override
    public AppUser findByEmail(String email) {
        Optional<AppUser> user = userRepository.findByEmail(email);
        if (user.isPresent())
            return user.get();
        else{
            log.error("User not found with provided email: '{}'",email);
            throw new IllegalArgumentException();
        }
    }

    @Override
    @Transactional
    public AppUser saveUser(RegisterRequest request) {
        AppUser appUser = AppUser.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .dateOfBirth(request.getDateOfBirth())
                .countryOfResidence(request.getCountryOfResidence())
                .role(Role.USER)
                .build();
        try {
            AppUser createdUser = userRepository.save(appUser);
            shoppingCartService.createShoppingCart(createdUser);
            return createdUser;
        } catch (Exception e) {
            throw new IllegalArgumentException(e.getMessage());
        }
    }

    @Override
    public List<AppUser> getAllRegisteredUsers() {
        return userRepository.findAll();
    }

    @Override
    public AppUserDetailsDto getUserById(String id) {
        Optional<AppUser> userById = userRepository.findById(UUID.fromString(id));
        if (userById.isPresent()) {
            return userMapper.mapUserToDTO(userById.get());
        } else{
            log.error("User with provided id: '{}' does not exist in the current database context.",id);
            throw new IllegalArgumentException();
        }
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        if (email.isEmpty()){
            log.error("Email is empty, cannot find any user");
            return null;
        }
        return findByEmail(email);
    }
}
