package com.afb.intern.operationmanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class RequestToPay {
    private String meanCode;
    private String paymentNumber;
    private String orderNumber;
    private Double amount;
    private String currency;
    private Double feesAmount;
}
