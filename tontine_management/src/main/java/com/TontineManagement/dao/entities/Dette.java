package com.TontineManagement.dao.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Dette")
@Setter
@Getter
public class Dette {
    @Id
    private String uuid;
}
