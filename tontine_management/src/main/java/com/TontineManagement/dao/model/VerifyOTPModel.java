package com.TontineManagement.dao.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VerifyOTPModel {
    private String phone;
    private String code;

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
