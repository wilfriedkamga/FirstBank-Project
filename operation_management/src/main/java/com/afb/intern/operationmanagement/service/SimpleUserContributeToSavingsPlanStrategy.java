package com.afb.intern.operationmanagement.service;

import com.afb.intern.operationmanagement.dto.*;
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

import java.util.List;

@Service
@RequiredArgsConstructor
public class SimpleUserContributeToSavingsPlanStrategy implements ContributeToSavingsPlanStrategy, WithdrawFromSavingsPlanStrategy{
    private final WalletRepository walletRepository;
    private final TransactionRepository transactionRepository;
    private final PaymentMethodRepository paymentMethodRepository;
    private final OperationService operationService;
    private final ModelMapper modelMapper = new ModelMapper();

    @Override
    public TransactionDto contribute(ContributeToSavingsPlanDto dto) {
        Wallet wallet = walletRepository.findById(dto.getWalletId())
                .orElseThrow(()-> new AppException("Something happen inside the server", HttpStatus.INTERNAL_SERVER_ERROR));
        Payment_Method paymentMethod = paymentMethodRepository.findById(dto.getPaymentMethodId())
                .orElseThrow(()-> new AppException("Something happened to the server", HttpStatus.INTERNAL_SERVER_ERROR));
        String adpToken = operationService.getADPToken();
        //List<FeesDto> fees = operationService.getFees(adpToken, dto.getAmount());
        TransactionDto transactionDto = new TransactionDto();
        /*if (paymentMethod.getMethodName().equals("ORANGE-MONEY")){
            Double fee = 0.000;

            for (FeesDto f : fees) {
                if (f.getMeanCode().equals("ORANGE-MONEY")) {
                    fee = f.getFeesAmount();
                    break;
                }
            }
            transactionDto = requestTowithdraw(adpToken, dto.getAmount(), fee, paymentMethod.getMethodName(), dto.getInitiator(), wallet.getId());
        } else if (paymentMethod.getMethodName().equals("MOBILE-MONEY")){
            Double fee = 0.00;

            for (FeesDto f : fees) {
                if (f.getMeanCode().equals("MOBILE-MONEY")) {
                    fee = f.getFeesAmount();
                    break;
                }
            }
            transactionDto = requestTowithdraw(adpToken, dto.getAmount(), fee, paymentMethod.getMethodName(), dto.getInitiator(), wallet.getId());
        }
        if (transactionDto != null){
            Transaction transaction = modelMapper.map(transactionDto, Transaction.class);
            Transaction saved = transactionRepository.save(transaction);
            wallet.setBalance(wallet.getBalance() + dto.getAmount());

            String url = "http://localhost:8085/savingsplanManagement/update-savings/contri";

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<SavingsDto> request= new HttpEntity<>(new SavingsDto(dto.getSavingsPlanId(), dto.getStatus(), dto.getSavingBalance()), headers);

            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<SavingsDto> response = restTemplate.exchange(url, HttpMethod.PUT, request, SavingsDto.class);
            if (response.getStatusCode() == HttpStatus.OK) {
                SavingsDto savings = response.getBody();
                System.out.println("account balance updated");
            } else {
                throw new AppException("Error updating account balance", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }*/
        return transactionDto;
    }

    public TransactionDto withdraw(WithdrawFromSavingsDto dto) {
        Wallet wallet = walletRepository.findById(dto.getWalletId())
                .orElseThrow(()-> new AppException("Something happened to the server", HttpStatus.INTERNAL_SERVER_ERROR));
        Payment_Method paymentMethod = paymentMethodRepository.findById(dto.getPaymentMethodId())
                .orElseThrow(()-> new AppException("Something happened to the server", HttpStatus.INTERNAL_SERVER_ERROR));
        String adpToken = operationService.getADPToken();
        //Double fees = operationService.getFees(adpToken, dto.getAmount());
        TransactionDto transactionDto = new TransactionDto();
        /*if (paymentMethod.getMethodName().equals("ORANGE-MONEY")){
            transactionDto = operationService.requestTowithdraw(adpToken, dto.getAmount(), fees, paymentMethod.getMethodName(), dto.getInitiator(), wallet.getId());
        } else if (paymentMethod.getMethodName().equals("MOBILE-MONEY")){
            transactionDto = operationService.requestTowithdraw(adpToken, dto.getAmount(), fees, paymentMethod.getMethodName(), dto.getInitiator(), wallet.getId());
        }

        if (transactionDto != null){
            Transaction transaction = modelMapper.map(transactionDto, Transaction.class);
            Transaction saved = transactionRepository.save(transaction);
            wallet.setBalance(wallet.getBalance() - dto.getAmount());

            String url = "http://localhost:8085/savingsplanManagement/update-savings/withdr";

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<SavingsDto> request= new HttpEntity<>(new SavingsDto(dto.getSavingsPlanId(), dto.getStatus(), dto.getSavingBalance()), headers);

            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<SavingsDto> response = restTemplate.exchange(url, HttpMethod.PUT, request, SavingsDto.class);
            if (response.getStatusCode() == HttpStatus.OK) {
                SavingsDto savings = response.getBody();
                System.out.println("account balance updated");
            } else {
                throw new AppException("Error updating account balance", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }*/
        return transactionDto;
    }
}
