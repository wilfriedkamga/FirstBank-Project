package com.example.AssociationManagement.Dao.Dto;
import com.example.AssociationManagement.Dao.Entity.Membre_Tont;
import com.example.AssociationManagement.Dao.Entity.Role_Tont;
import com.example.AssociationManagement.Dao.Entity.Tontine;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

public class MembreTontDto {

    private String id;
    private String name;
    private int nbOcc;
    private String phone;
    private LocalDate creationDate;
    private List<String> tontineIds; // List of Tontine IDs
    private String roleTontId;

    // Constructors
    public MembreTontDto() {}

    public MembreTontDto(Membre_Tont membreTont) {
        this.id = membreTont.getId();
        this.name = membreTont.getName();
        this.nbOcc = membreTont.getNbOcc();
        this.phone = membreTont.getPhone();
        this.creationDate = membreTont.getCreationDate();
        this.tontineIds = membreTont.getTontines().stream()
                .map(Tontine::getId)
                .collect(Collectors.toList());
        this.roleTontId = membreTont.getRole_tont().getId();
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public int getNbOcc() { return nbOcc; }
    public void setNbOcc(int nbOcc) { this.nbOcc = nbOcc; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public LocalDate getCreationDate() { return creationDate; }
    public void setCreationDate(LocalDate creationDate) { this.creationDate = creationDate; }

    public List<String> getTontineIds() { return tontineIds; }
    public void setTontineIds(List<String> tontineIds) { this.tontineIds = tontineIds; }

    public String getRoleTontId() { return roleTontId; }
    public void setRoleTontId(String roleTontId) { this.roleTontId = roleTontId; }
}
