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
public class SavingsDto {

    private String id;
    private String status;
    private Double savingBalance;
}
