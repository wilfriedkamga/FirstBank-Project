package com.UserManagement.dao.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "User")
@Getter
@Setter
public class User {

    @Id
    @Column(name = "phone", nullable = false)
    private String phone;

    @Column(name = "fullName")
    private String fullName;

    @Column(name = "birthDate")
    private LocalDate birthDate;

    @Column(name = "gender")
    private String gender;

    @Column(name = "password")
    private String password;

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "emailIsValid")
    private boolean emailIsValid;

    @Column(name = "cni_recto")
    private String cniRecto;

    @Column(name = "cni_verso")
    private String cniVerso;

    @Column(name = "signature")
    private String signature;

    @Column(name = "isActivated")
    private Boolean isActivated = false;

    @Column(name = "isBlocked")
    private Boolean isBlocked = false;

    @Column(name = "photo")
    private String photo;

    @Column(name = "CreationDate")
    private LocalDateTime creationDate;

    // Un utilisateur peut avoir plusieurs rôles
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "phone", referencedColumnName = "phone"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "idRole"))
    private List<Role> roles;

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

    public boolean isEmailIsValid() {
        return emailIsValid;
    }

    public void setEmailIsValid(boolean emailIsValid) {
        this.emailIsValid = emailIsValid;
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

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }
}
