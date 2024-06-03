package com.afb.intern.savingsplanmanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class SavingsDto {

    private String reason;
    private List<Date> reminder;
    private Double amountTarget;
    private Date dueDate;
    private String phone;
}
