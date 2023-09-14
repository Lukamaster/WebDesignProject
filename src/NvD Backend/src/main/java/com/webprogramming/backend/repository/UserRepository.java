package com.webprogramming.backend.repository;

import com.webprogramming.backend.model.identity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<AppUser, UUID> {

    Optional<AppUser> findByEmail(String email);
    Optional<AppUser> findById(UUID id);
}
