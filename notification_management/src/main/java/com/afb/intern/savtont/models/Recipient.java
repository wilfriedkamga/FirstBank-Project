package com.afb.intern.savtont.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
@Table(name = "recipients", uniqueConstraints = @UniqueConstraint(columnNames = {"recipient", "token"}))
public class Recipient {
    @Id
    private String id;

    @Column(name = "recipient",nullable = false)
    private String recipient;

    @Column(name = "token", nullable = false)
    private String token;
}
