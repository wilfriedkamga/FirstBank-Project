package com.UserManagement.dao.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.io.IOUtils;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.PathVariable;

import javax.persistence.Column;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

public class UserLoginModel {

    private String phone;
    private String fullName;
    private LocalDate birthDate;
    private String gender;
    private String password;
    private String email;
    private boolean emailIsVallid;
    private String cniRecto;
    private String cniVerso;
    private String signature;
    private boolean isActivate;
    private String photo;
    private List<String> privilegelist = new ArrayList<String>();

    public boolean isActivate() {
        return isActivate;
    }

    public void setActivate(boolean activate) {
        isActivate = activate;
    }

    public boolean isEmailIsVallid() {
        return emailIsVallid;
    }

    public void setEmailIsVallid(boolean emailIsVallid) {
        this.emailIsVallid = emailIsVallid;
    }

    public String getCniRecto() {
        return cniRecto;
    }

    public void setCniRecto(String cniRecto) {
        this.cniRecto = cniRecto;
    }

    public String getCniVerso() {
        return cniVerso;
    }

    public void setCniVerso(String cniVerso) {
        this.cniVerso = cniVerso;
    }

    public String getSignature() {
        return signature;
    }

    public void setSignature(String signature) {
        this.signature = signature;
    }

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

    public UserLoginModel(String phone, String fullName, LocalDate birthDate, String gender, String password, String email, boolean emailIsVallid, String cniRecto, String cniVerso, String signature, String photo, List<String> privilegelist, boolean isActivate) {
        this.phone = phone;
        this.fullName = fullName;
        this.birthDate = birthDate;
        this.gender = gender;
        this.password = password;
        this.email = email;
        this.emailIsVallid = emailIsVallid;
        this.cniRecto = cniRecto;
        this.cniVerso = cniVerso;
        this.signature = signature;
        this.photo = photo;
        this.privilegelist = privilegelist;
        this.isActivate=isActivate;
    }


}
