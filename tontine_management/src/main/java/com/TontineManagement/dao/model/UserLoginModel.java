package com.TontineManagement.dao.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@Builder
public class UserLoginModel {

    private String phone;
    private String fullName;
    private LocalDate birthDate;
    private String gender;
    private String password;
    private String email;
    private String idCard;
    private String photo;
    private List<String> privilegelist = new ArrayList<String>();

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getIdCard() {
        return idCard;
    }

    public void setIdCard(String idCard) {
        this.idCard = idCard;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public List<String> getPrivilegelist() {
        return privilegelist;
    }

    public void setPrivilegelist(List<String> privilegelist) {
        this.privilegelist = privilegelist;
    }

    public UserLoginModel(String phone, String fullName, LocalDate birthDate, String gender, String password, String email, String idCard, String photo, List<String> privilegelist) {
        this.phone = phone;
        this.fullName = fullName;
        this.birthDate = birthDate;
        this.gender = gender;
        this.password = password;
        this.email = email;
        this.idCard = idCard;
        this.photo = photo;
        this.privilegelist = privilegelist;
    }
}
