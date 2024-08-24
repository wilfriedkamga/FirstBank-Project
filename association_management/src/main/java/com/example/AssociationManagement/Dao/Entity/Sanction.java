package com.example.AssociationManagement.Dao.Entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.LocalDate;


@Entity
@Table(name = "sanction")
@AllArgsConstructor
@NoArgsConstructor
public class Sanction {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    private String montant;

    private LocalDate delayDate;
    private LocalDate startDate;


    private String etat; // Enum for sanction status

    // Relation entre sanction et membre_tont
    @ManyToOne
    @JoinColumn(name = "membre_tont_id", nullable = false)
    private Membre_Tont membre_tont;



}
