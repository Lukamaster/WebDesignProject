package com.webprogramming.backend;

import com.stripe.Stripe;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@OpenAPIDefinition
@EnableJpaRepositories("com.webprogramming.backend.repository")
@SecurityScheme(
		name = "securityScheme",
		scheme = "bearer",
		bearerFormat = "JWT",
		type = SecuritySchemeType.HTTP,
		in = SecuritySchemeIn.HEADER
)
public class WebProgrammingBackend {

	public static void main(String[] args) {
		SpringApplication.run(WebProgrammingBackend.class,args);
	}

	@PostConstruct
	public void setup() {
		Stripe.apiKey = "sk_test_51NOOIfF4xvj0hs3UKGPmklCC0G4RLPrb96xU0c6LtgZE7vGZbtWfVYeJ81RNvzE8FgSNIfajqjRb71Bmj9T4DKNX00PhLsq1fw";
	}
}
