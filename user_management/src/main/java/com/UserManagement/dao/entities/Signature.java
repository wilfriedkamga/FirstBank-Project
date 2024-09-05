package com.UserManagement.dao.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;


@Entity
@Table(name = "signature")
public class Signature {

    @SequenceGenerator(name = "sign_id_seq", sequenceName = "sign_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sign_id_seq")
    @Id
    @Column(name = "id", nullable = false)
    private Long id;

    private String type;
    private String text;
    private String lien;
}
