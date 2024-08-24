package com.example.AssociationManagement.Dao.Entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "membre_tont")
@AllArgsConstructor
@NoArgsConstructor
public class Membre_Tont {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    private String name;

    private String phone;

    private LocalDate creationDate;

    @ManyToMany(mappedBy = "membres_tont")
    private List<Tontine> tontines = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "role_tont_id", nullable = false)
    private Role_Tont role_tont;

    @OneToMany(mappedBy = "membre_tont", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Sanction> sanctions = new ArrayList<>();

    @OneToMany(mappedBy = "membre_tont", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Cotisation> cotisations = new ArrayList<>();

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

    public List<Tontine> getTontines() {
        return tontines;
    }

    public void setTontines(List<Tontine> tontines) {
        this.tontines = tontines;
    }

    public Role_Tont getRole_tont() {
        return role_tont;
    }

    public void setRole_tont(Role_Tont role_tont) {
        this.role_tont = role_tont;
    }

    public List<Sanction> getSanctions() {
        return sanctions;
    }

    public void setSanctions(List<Sanction> sanctions) {
        this.sanctions = sanctions;
    }

    public List<Cotisation> getCotisations() {
        return cotisations;
    }

    public void setCotisations(List<Cotisation> cotisations) {
        this.cotisations = cotisations;
    }
}
