package com.TontineManagement.dao.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Cagnotte")
@Setter
@Getter
public class Cagnotte {

    @Id
    private String uuid;
}
