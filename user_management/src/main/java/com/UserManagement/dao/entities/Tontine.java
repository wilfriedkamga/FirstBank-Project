package com.UserManagement.dao.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Tontine")
@Setter
@Getter
public class Tontine {

    @Id
    @Column(name = "id",nullable = false)
    private long Id;


}
