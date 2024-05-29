package com.afb.intern.operationmanagement.controller;

import com.afb.intern.operationmanagement.dto.*;
import com.afb.intern.operationmanagement.models.Payment_Method;
import com.afb.intern.operationmanagement.service.OperationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/operationService")
public class OperationController {
    private final OperationService operationService;

    @PostMapping("/create-wallet/{phoneNum}")
    public ResponseEntity<WalletDto> createWallet(@RequestBody CreationDto walletDto){
        WalletDto wallet = operationService.createWalletForUser(walletDto);
        return ResponseEntity.ok(wallet);
    }

    @GetMapping("/get-account-balance")
    public ResponseEntity<WalletDto> getAccountBalance(@RequestParam String phoneNum){
        WalletDto wallet = operationService.getAccountBalance(phoneNum);
        return ResponseEntity.ok(wallet);
    }

    @PostMapping("/add-payment-method")
    public ResponseEntity<Payment_Method> addPaymentMethod(@RequestBody Payment_Method method){
        Payment_Method paymentMethod = operationService.addPaymentMethod(method);
        return ResponseEntity.ok(paymentMethod);
    }

    @PostMapping("/contribute/user")
    public ResponseEntity<TransactionDto> simpleUsercontributeToSavings(@RequestBody ContributeToSavingsPlanDto dto, @AuthenticationPrincipal UserDto user){
        TransactionDto transaction = operationService.contributeToSavingsPlan(user, dto);
        return ResponseEntity.ok(transaction);
    }

    @PostMapping("/contribute/admin")
    public ResponseEntity<TransactionDto> collectorContributeToSavings(@RequestBody ContributeToSavingsPlanDto dto, @AuthenticationPrincipal UserDto user){
        TransactionDto transaction = operationService.contributeToSavingsPlan(user, dto);
        return ResponseEntity.ok(transaction);
    }

    @PostMapping("/withdraw/user")
    public ResponseEntity<TransactionDto> simpleUserwithdrawToSavings(@RequestBody WithdrawFromSavingsDto dto, @AuthenticationPrincipal UserDto user) {
        TransactionDto transaction = operationService.withdrawFromSavingsPlan(user, dto);
        return ResponseEntity.ok(transaction);
    }

    @PostMapping("/withdraw/bank-agent")
    public ResponseEntity<TransactionDto> bankAgentwithdrawToSavings(@RequestBody WithdrawFromSavingsDto dto, @AuthenticationPrincipal UserDto user) {
        TransactionDto transaction = operationService.withdrawFromSavingsPlan(user, dto);
        return ResponseEntity.ok(transaction);
    }

}
