package com.afb.intern.operationmanagement.service;

import com.afb.intern.operationmanagement.dto.SavingsDto;
import com.afb.intern.operationmanagement.dto.TransactionDto;
import com.afb.intern.operationmanagement.dto.WithdrawFromSavingsDto;
import com.afb.intern.operationmanagement.exceptions.AppException;
import com.afb.intern.operationmanagement.models.Payment_Method;
import com.afb.intern.operationmanagement.models.Transaction;
import com.afb.intern.operationmanagement.models.Wallet;
import com.afb.intern.operationmanagement.repository.PaymentMethodRepository;
import com.afb.intern.operationmanagement.repository.TransactionRepository;
import com.afb.intern.operationmanagement.repository.WalletRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class BankAgentWithdrawFromSavingsPlan implements WithdrawFromSavingsPlanStrategy{
    private final WalletRepository walletRepository;
    private final TransactionRepository transactionRepository;
    private final PaymentMethodRepository paymentMethodRepository;
    private final OperationService operationService;
    private final ModelMapper modelMapper = new ModelMapper();


    @Override
    public TransactionDto withdraw(WithdrawFromSavingsDto dto) {
        Wallet wallet = walletRepository.findById(dto.getWalletId())
                .orElseThrow(()-> new AppException("Something happen inside the server", HttpStatus.INTERNAL_SERVER_ERROR));
        Payment_Method paymentMethod = paymentMethodRepository.findById(dto.getPaymentMethodId())
                .orElseThrow(()-> new AppException("Something happened to the server", HttpStatus.INTERNAL_SERVER_ERROR));
        String adpToken = operationService.getADPToken();
        Double fees = operationService.getFees(adpToken, dto.getAmount());
        TransactionDto transactionDto = new TransactionDto();
       /* if (dto.getCode().equals(wallet.getCode())){
            if (paymentMethod.getMethodName().equals("ORANGE-MONEY")){
                transactionDto = operationService.requestTowithdraw(adpToken, dto.getAmount(), fees, paymentMethod.getMethodName(), dto.getInitiator(), wallet.getId());
            } else if (paymentMethod.getMethodName().equals("MOBILE-MONEY")){
                transactionDto = operationService.requestTowithdraw(adpToken, dto.getAmount(), fees, paymentMethod.getMethodName(), dto.getInitiator(), wallet.getId());
            }

            if (transactionDto != null){
                Transaction transaction = modelMapper.map(transactionDto, Transaction.class);
                Transaction saved = transactionRepository.save(transaction);
                wallet.setBalance(wallet.getBalance() - dto.getAmount());

                String url = "http://localhost:8085/savingsplanManagement/update-savings/" + wallet.getOwner() + "/" + dto.getSavingsPlanId();

                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_JSON);
                HttpEntity<SavingsDto> request= new HttpEntity<>(new SavingsDto(dto.getSavingsId(), dto.getValidity(), dto.getReason(), dto.getStatus(), dto.getReminder(), dto.getSavingBalance(), dto.getAmountTarget(), dto.getDueDate(), dto.getPhone()), headers);

                RestTemplate restTemplate = new RestTemplate();
                ResponseEntity<SavingsDto> response = restTemplate.exchange(url, HttpMethod.PUT, request, SavingsDto.class);
                if (response.getStatusCode() == HttpStatus.OK) {
                    SavingsDto savings = response.getBody();
                    System.out.println("account balance updated");
                } else {
                    throw new AppException("Error updating account balance", HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }
        }*/
        return transactionDto;
    }
}
