package com.afb.intern.operationmanagement.service;

import com.afb.intern.operationmanagement.dto.TransactionDto;
import com.afb.intern.operationmanagement.dto.WithdrawFromSavingsDto;

public interface WithdrawFromSavingsPlanStrategy {
    TransactionDto withdraw(WithdrawFromSavingsDto dto);
}
