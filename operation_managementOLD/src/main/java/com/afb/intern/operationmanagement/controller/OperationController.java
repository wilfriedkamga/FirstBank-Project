package com.afb.intern.operationmanagement.controller;

import com.afb.intern.operationmanagement.dto.*;
import com.afb.intern.operationmanagement.models.Payment_Method;
import com.afb.intern.operationmanagement.models.Wallet;
import com.afb.intern.operationmanagement.service.OperationService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/operationService")
public class OperationController {
    private final OperationService operationService;

    @PostMapping("/create-wallet")
    public ResponseEntity<WalletDto> createWallet(@RequestBody CreationDto walletDto){
        WalletDto wallet = operationService.createWalletForUser(walletDto);
        return ResponseEntity.ok(wallet);
    }

    @GetMapping("/get-Payment")
    public ResponseEntity<List<Payment_Method>> getPaymentMethods(){
        List<Payment_Method> paymentMethods = operationService.getAllPaymentMethods();
        return new ResponseEntity<>(paymentMethods, HttpStatus.OK);
    }

    @GetMapping("/get-account-balance/{phoneNum}")
    public ResponseEntity<WalletDto> getAccountBalance(@PathVariable String phoneNum){
        WalletDto wallet = operationService.getAccountBalance(phoneNum);
        return ResponseEntity.ok(wallet);
    }

    @GetMapping("/get-Wallet/{phoneNum}")
    public ResponseEntity<Wallet> getWalletForUser(@PathVariable String phoneNum){
        Wallet wallet = operationService.getWalletByOwner(phoneNum);
        return ResponseEntity.ok(wallet);
    }

    @PostMapping("/add-payment-method")
    public ResponseEntity<Payment_Method> addPaymentMethod(@RequestBody Map<String, String> method) {
        Payment_Method paymentMethod = operationService.addPaymentMethod(method.get("method"));
        return ResponseEntity.ok(paymentMethod);
    }

    @PostMapping("/contribute/user")
    public ResponseEntity<TransactionDto> simpleUsercontributeToSavings(@RequestBody ContributeToSavingsPlanDto dto) throws JsonProcessingException {
        TransactionDto transaction = operationService.simpleUsercontributeToSavingsPlan(dto);
        return ResponseEntity.ok(transaction);
    }

    @PostMapping("/contribute/collector")
    public ResponseEntity<TransactionDto> collectorContributeToSavings(@RequestBody ContributeToSavingsPlanDto dto) throws JsonProcessingException {
        TransactionDto transaction = operationService.collectorContributeToSavings(dto);
        return ResponseEntity.ok(transaction);
    }

    @PostMapping("/withdraw/user")
    public ResponseEntity<TransactionDto> simpleUserwithdrawToSavings(@RequestBody WithdrawFromSavingsDto dto) throws JsonProcessingException {
        TransactionDto transaction = operationService.simpleUserwithdrawFromSavings(dto);
        return ResponseEntity.ok(transaction);
    }

    @PostMapping("/withdraw/bank-agent")
    public ResponseEntity<TransactionDto> bankAgentwithdrawToSavings(@RequestBody WithdrawFromSavingsDto dto) throws JsonProcessingException {
        TransactionDto transaction = operationService.bankAgentwithdrawFromSaving(dto);
        return ResponseEntity.ok(transaction);
    }

}
