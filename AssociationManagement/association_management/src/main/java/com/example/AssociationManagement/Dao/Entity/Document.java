package com.example.AssociationManagement.Dao.Entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Table(name = "document")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Document {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    private String chemin;

    // Getters and Setters
}
