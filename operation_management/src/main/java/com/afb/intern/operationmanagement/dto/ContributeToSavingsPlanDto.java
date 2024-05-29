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
public class ContributeToSavingsPlanDto {
    private String walletId;
    private String initiator;
    private String savingsPlanId;
    private String paymentMethodId;
    private Double amount;
    private String SavingsId;
    private Date validity;
    private String reason;
    private String status;
    private String reminder;
    private Double savingBalance;
    private Double amountTarget;
    private Date dueDate;
    private String phone;
}
