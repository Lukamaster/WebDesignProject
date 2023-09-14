package com.webprogramming.backend.model.mapper;

import com.webprogramming.backend.model.dto.AppUserDetailsDto;
import com.webprogramming.backend.model.identity.AppUser;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-07-13T16:32:10+0200",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 17.0.7 (Amazon.com Inc.)"
)
@Component
public class AppUserMapperImpl implements AppUserMapper {

    @Override
    public AppUserDetailsDto mapUserToDTO(AppUser user) {
        if ( user == null ) {
            return null;
        }

        AppUserDetailsDto appUserDetailsDto = new AppUserDetailsDto();

        appUserDetailsDto.setFirstName( user.getFirstName() );
        appUserDetailsDto.setUsername( user.getUsername() );
        appUserDetailsDto.setLastName( user.getLastName() );
        appUserDetailsDto.setEmail( user.getEmail() );
        appUserDetailsDto.setDateOfBirth( user.getDateOfBirth() );
        appUserDetailsDto.setCountryOfResidence( user.getCountryOfResidence() );

        return appUserDetailsDto;
    }
}
