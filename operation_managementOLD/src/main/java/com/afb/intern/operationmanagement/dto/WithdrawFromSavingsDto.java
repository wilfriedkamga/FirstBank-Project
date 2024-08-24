package com.afb.intern.operationmanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class WithdrawFromSavingsDto {
    private String walletId;
    private String initiator;
    private String savingsPlanId;
    private String paymentMethodId;
    private String code;
    private Double amount;
    private String status;
    private Double savingBalance;
}
