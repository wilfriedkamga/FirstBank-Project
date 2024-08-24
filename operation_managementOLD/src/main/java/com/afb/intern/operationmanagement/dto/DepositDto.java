package com.afb.intern.operationmanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class DepositDto {
    private String receiverwalletId;
    private Double amount;
    private Long paymentMethod;
    private String initiator;
}
