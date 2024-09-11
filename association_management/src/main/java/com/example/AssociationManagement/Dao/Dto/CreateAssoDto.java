package com.example.AssociationManagement.Dao.Dto;


import com.example.AssociationManagement.Dao.Entity.Association;
import com.example.AssociationManagement.Dao.Entity.Membre_Asso;
import com.example.AssociationManagement.Dao.Entity.Role_Asso;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class CreateAssoDto {


    private String id;
    private String name;
    private String frequenceReunion;
    private String jourReunion;
    private LocalDate creationDate;
    private List<RoleAssoDto> roles;
    private List<MembreAssoDto> membres;
    private int nbMembres;
    private int nbTontines;
    private int nbNotifications;

    public CreateAssoDto(String id, String name, String frequenceReunion, String jourReunion, LocalDate creationDate, List<RoleAssoDto> roles, List<MembreAssoDto> membres, int nbMembres, int nbTntines, int nbNotifications) {
        this.id = id;
        this.name = name;
        this.frequenceReunion = frequenceReunion;
        this.jourReunion = jourReunion;
        this.creationDate = creationDate;
        this.roles = roles;
        this.nbMembres = nbMembres;
        this.nbTontines = nbTntines;
        this.nbNotifications = nbNotifications;
    }
}

