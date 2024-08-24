package com.example.AssociationManagement.Dao.Entity;


import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "dette")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Dette {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    private BigDecimal montant;
    private LocalDate dateDelai;
    private BigDecimal montantNet;
    private BigDecimal montantARembourser;

    private String etat; // Enum for debt status

    @ManyToOne
    @JoinColumn(name = "membre_tont_id", nullable = false)
    private Membre_Tont membre_tont;

    @OneToOne(mappedBy = "dette", cascade = CascadeType.ALL, orphanRemoval = true)
    private Remboursement remboursement;

    @OneToOne
    @JoinColumn(name = "document_id", nullable = false)
    private Document document;

    // Getters and Setters
}
