package com.afb.intern.savingsplanmanagement.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class SavOpsDto {
    private String id;
    private String status;
    private Double savingBalance;
}
