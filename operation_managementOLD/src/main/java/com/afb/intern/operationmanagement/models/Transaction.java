package com.afb.intern.operationmanagement.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @Column(name = "Id", nullable = false)
    private String Id;

    @Column(name = "amount", nullable = false)
    private Double amount;

    @Column(name = "transaction_Type", nullable = false)
    private String transactionType;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "payment_methods_id")
    private Payment_Method paymentMethod;

    @Column(name = "initiator", nullable = false)
    private String phoneInitiator;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "wallet_id")
    private Wallet senderwallet;

    @Column(name = "currency", nullable = false)
    private String currency;

    @Column(name = "adpfootPrint", nullable = false)
    private String adpFootPrint;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "wallets_id")
    private Wallet receiverwallet;

    @Column(name = "timestamp", nullable = false)
    private Date timestamp;

    @Column(name = "status", nullable = false)
    private String status;

}
