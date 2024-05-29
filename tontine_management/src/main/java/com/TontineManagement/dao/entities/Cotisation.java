package com.TontineManagement.dao.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "Cotisation")
@Setter
@Getter
public class Cotisation {

    @Id
    private String uuid;
}
