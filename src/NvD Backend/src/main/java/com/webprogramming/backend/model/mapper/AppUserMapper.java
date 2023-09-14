package com.webprogramming.backend.model.mapper;

import com.webprogramming.backend.model.identity.AppUser;
import com.webprogramming.backend.model.dto.AppUserDetailsDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AppUserMapper {

    @Mapping(source = "firstName",target = "firstName")
    @Mapping(source = "username",target = "username")
    @Mapping(source = "lastName",target = "lastName")
    @Mapping(source = "email",target = "email")
    @Mapping(source = "dateOfBirth",target = "dateOfBirth")
    @Mapping(source = "countryOfResidence",target = "countryOfResidence")
    AppUserDetailsDto mapUserToDTO(AppUser user);
}
