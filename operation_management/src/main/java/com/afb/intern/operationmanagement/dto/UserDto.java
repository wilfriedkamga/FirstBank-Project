package com.afb.intern.operationmanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class UserDto {
    private String id;
    private String phoneNum;
    private String name;
    private String firstname;
    private String gender;
    private Date birthday;
    private UserType userType;
    private String email;
    private String password;
    private String profile;
    private String IDCard;
    private String role;
    private String token;
}
