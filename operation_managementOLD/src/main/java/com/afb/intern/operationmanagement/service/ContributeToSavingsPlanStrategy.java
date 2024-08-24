package com.afb.intern.operationmanagement.service;

import com.afb.intern.operationmanagement.dto.ContributeToSavingsPlanDto;
import com.afb.intern.operationmanagement.dto.TransactionDto;

public interface ContributeToSavingsPlanStrategy {
    TransactionDto contribute(ContributeToSavingsPlanDto dto);
}
