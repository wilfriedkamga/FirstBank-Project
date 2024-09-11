package com.example.AssociationManagement.Dao.Dto;

import com.example.AssociationManagement.Dao.Entity.Privilege_Tont;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PrivilegeTontDto {

    private String id;

    // Constructeur à partir de l'entité Privilege_Tont
    public PrivilegeTontDto(Privilege_Tont privilegeTont) {
        this.id = privilegeTont.getId();
    }
}
