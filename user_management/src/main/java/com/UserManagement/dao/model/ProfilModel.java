package com.UserManagement.dao.model;

import com.UserManagement.dao.entities.Privilege;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ProfilModel {

    @NotNull
    private String phone;
    @NotNull
    private String newPhone;
    private String fullName;
    private LocalDate birthDate;
    private String gender;
    private String password;
    private String email;
    private String idCardImage;
    private LocalDate idCardExpirationDate;
    private String signature;
    private Boolean isActivated;
    private Boolean isBlocked;
    private String photo;
    private LocalDateTime creationDate;
    private List<Privilege> privilegelist;

    public String getNewPhone() {
        return newPhone;
    }

    public void setNewPhone(String newPhone) {
        this.newPhone = newPhone;
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

    public String getIdCardImage() {
        return idCardImage;
    }

    public void setIdCardImage(String idCardImage) {
        this.idCardImage = idCardImage;
    }

    public LocalDate getIdCardExpirationDate() {
        return idCardExpirationDate;
    }

    public void setIdCardExpirationDate(LocalDate idCardExpirationDate) {
        this.idCardExpirationDate = idCardExpirationDate;
    }

    public String getSignature() {
        return signature;
    }

    public void setSignature(String signature) {
        this.signature = signature;
    }

    public Boolean getActivated() {
        return isActivated;
    }

    public void setActivated(Boolean activated) {
        isActivated = activated;
    }

    public Boolean getBlocked() {
        return isBlocked;
    }

    public void setBlocked(Boolean blocked) {
        isBlocked = blocked;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDateTime creationDate) {
        this.creationDate = creationDate;
    }

    public List<Privilege> getPrivilegelist() {
        return privilegelist;
    }

    public void setPrivilegelist(List<Privilege> privilegelist) {
        this.privilegelist = privilegelist;
    }
}
