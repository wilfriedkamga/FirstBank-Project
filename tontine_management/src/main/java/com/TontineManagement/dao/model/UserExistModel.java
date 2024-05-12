package com.TontineManagement.dao.model;

import lombok.Getter;
import lombok.Setter;

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