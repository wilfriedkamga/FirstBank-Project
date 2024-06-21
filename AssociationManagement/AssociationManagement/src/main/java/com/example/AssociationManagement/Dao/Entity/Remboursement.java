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
@Table(name = "remboursement")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Remboursement {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    private BigDecimal montant;
    private LocalDate dateRemboursement;

    @OneToOne
    @JoinColumn(name = "dette_id", nullable = false)
    private Dette dette;

    // Getters and Setters
}
