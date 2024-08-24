package com.afb.intern.operationmanagement.models;

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
@Table(name = "payment_methods")
public class Payment_Method {

    @Id
    @Column(name = "Id", nullable = false)
    private String Id;

    @Column(name = "method_name", nullable = false)
    private String methodName;
}
