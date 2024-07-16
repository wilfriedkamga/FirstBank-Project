package com.example.AssociationManagement.Dao.Entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "cotisation")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Cotisation {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    private BigDecimal montant;

    @ManyToOne
    @JoinColumn(name = "tontine_id", nullable = false)
    private Tontine tontine;

    @ManyToOne
    @JoinColumn(name = "reunion_id", nullable = false)
    private Reunion reunion;

    @ManyToOne()
    @JoinColumn(name = "cot_mem_tont",nullable = false)
    private Membre_Tont membre_tont;

    // Getters and Setters
}
