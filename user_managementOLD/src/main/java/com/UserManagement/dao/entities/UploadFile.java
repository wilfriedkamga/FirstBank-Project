package com.UserManagement.dao.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "upload_files")
@Setter
@Getter
public class UploadFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "fileName")
    private String name;

    @Column(name = "filePath")
    private String path;

    @Column(name = "adresse")
    private String adresse;

    public UploadFile(String name, String path,String adresse) {
        this.name = name;
        this.path = path;
        this.adresse=adresse;
    }
}