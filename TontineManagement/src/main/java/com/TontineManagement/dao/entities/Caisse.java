package com.TontineManagement.dao.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "Caisse")
@Setter
@Getter
public class Caisse {
    @Id
    private String uuid;
}
