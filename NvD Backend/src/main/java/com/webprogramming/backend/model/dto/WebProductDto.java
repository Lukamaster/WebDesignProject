package com.webprogramming.backend.model.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.*;


@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class WebProductDto {

    @NotEmpty
    private Long id;
    @NotEmpty
    private String name;
    @NotEmpty
    private Long quantity;

}
