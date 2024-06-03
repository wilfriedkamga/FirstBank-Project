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
@Table(name = "wallets")
public class Wallet {

    @Id
    @Column(name = "wallet_id", nullable = false)
    private String Id;

    @Column(name = "account_balance", nullable = false)
    private Double balance;

    @Column(name = "owner", nullable = false)
    private String owner;

    @Column(name = "code_of_validation", nullable = false)
    private String code;

    @Column(name = "wallet_type", nullable = false)
    private String wallet_type;
}
