package com.UserManagement.dao.model;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

import lombok.*;

import java.time.LocalDate;
import java.util.*;

@Setter
@Getter

public class UserExistModel {

    private String phone;

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}