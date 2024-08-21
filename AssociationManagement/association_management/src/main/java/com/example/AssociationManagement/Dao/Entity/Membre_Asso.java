package com.example.AssociationManagement.Dao.Entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "membre_asso")
@Setter
@Getter
@NoArgsConstructor
public class Membre_Asso {


    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    private String name;

    private String phone;

    private boolean statusConfirmation=false;

    private int numOrdre;

    private boolean stateConfirmation=false;

    private LocalDate creationDate;

    @ManyToOne
    @JoinColumn(name = "role_id", nullable = false)
    private Role_Asso role;

    @ManyToMany(mappedBy = "membres")
    private List<Association> associations = new ArrayList<>();

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public Role_Asso getRole() {
        return role;
    }

    public int getNumOrdre() {
        return numOrdre;
    }

    public boolean isStatusConfirmation() {
        return statusConfirmation;
    }

    public void setStatusConfirmation(boolean statusConfirmation) {
        this.statusConfirmation = statusConfirmation;
    }

    public boolean isStateConfirmation() {
        return stateConfirmation;
    }

    public void setStateConfirmation(boolean stateConfirmation) {
        this.stateConfirmation = stateConfirmation;
    }

    public void setNumOrdre(int numOrdre) {
        this.numOrdre = numOrdre;
    }



    public void setRole(Role_Asso role) {
        this.role = role;
    }

    public List<Association> getAssociations() {
        return associations;
    }

    public void setAssociations(List<Association> associations) {
        this.associations = associations;
    }
}
