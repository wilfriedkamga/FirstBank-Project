package com.afb.intern.operationmanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class TransactionDto {

    private Double amount;
    private String TransactionType;
    private String paymentMethod;
    private String initiator;
    private String senderwalletId;
    private String receiverwalletId;
    private String status;
    private String adpFootprint;

}
