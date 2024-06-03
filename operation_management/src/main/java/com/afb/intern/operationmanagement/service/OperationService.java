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

import java.util.Date;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OperationService {

    private final TransactionRepository transactionRepository;
    private final WalletRepository walletRepository;
    private final PaymentMethodRepository paymentMethodRepository;
    private Map<UserType, ContributeToSavingsPlanStrategy> contributeStrategies;
    private Map<UserType, WithdrawFromSavingsPlanStrategy> withdrawStrategies;
    private final ModelMapper modelMapper = new ModelMapper();

    public WalletDto createWalletForUser(CreationDto walletDto) {
        Wallet wallet = modelMapper.map(walletDto, Wallet.class);
        wallet.setBalance(0.00);
        wallet.setWallet_type("personal");
        Wallet created = walletRepository.save(wallet);
        return modelMapper.map(wallet, WalletDto.class);
    }

    public WalletDto getAccountBalance(String owner){
        Wallet wallet = walletRepository.findByOwner(owner)
                .orElseThrow(() -> new AppException("wrong owner id", HttpStatus.NOT_FOUND));
        return modelMapper.map(wallet, WalletDto.class);
    }

    public Payment_Method addPaymentMethod(Payment_Method method) {
        Payment_Method newMethod = paymentMethodRepository.save(method);
        return method;
    }

    public TransactionDto contributeToSavingsPlan(UserDto user, ContributeToSavingsPlanDto dto) {
        ContributeToSavingsPlanStrategy strategy = contributeStrategies.get(user.getUserType());
        return strategy.contribute(dto);
    }

    public TransactionDto withdrawFromSavingsPlan(UserDto user, WithdrawFromSavingsDto dto) {
        WithdrawFromSavingsPlanStrategy strategy = withdrawStrategies.get(user.getUserType());
        return strategy.withdraw(dto);
    }

    public String getADPToken() {
        String url = "https://twsv03.adwapay.com/getADPToken";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBasicAuth(System.getenv("CASHIN-AFB-USERNAME"), System.getenv("CASHIN-AFB-PASSWORD"));
        String requestBody = "{\n" +
                "    \"application\": \"AP5DDSMP9KXXJFA2P\"\n" +
                "}";

        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);

        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<String> response = restTemplate.postForEntity(url, requestEntity, String.class);
        if (response.getStatusCode() == HttpStatus.OK){
            return response.getBody();
        } else {
            throw new AppException("The Server is underway maintenance, update the code", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public Double getFees(String adpToken, Double amount) {
        String url = "https://twsv03.adwapay.com/getFees";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("AUTH-API-TOKEN", "Bearer "+ adpToken);
        headers.set("AUTH-API-SUBSCRIPTION", System.getenv("CASHIN-AFB-PASSWORD"));
        String requestBody = "{\r\n    \"amount\": " + amount + ",\r\n    \"currency\": \"XAF\"\r\n}";

        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);
        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<String> response = restTemplate.postForEntity(url, requestEntity, String.class);
        if (response.getStatusCode() == HttpStatus.OK) {
            return Double.parseDouble(response.getBody());
        } else {
            throw new AppException("The Server is underway maintenance, update the code", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public TransactionDto requestToPay(String adpToken, Double amount, Double fees, String meanCode, String initiator, String walletId) {
        String url = "https://twsv03.adwapay.com/requestToPay";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("AUTH-API-TOKEN", "Bearer "+ adpToken);
        headers.set("AUTH-API-SUBSCRIPTION", System.getenv("CASHIN-AFB-PASSWORD"));
        String requestBody = "{\r\n    \"meanCode\": \"" + meanCode + "\",\r\n    \"paymentNumber\": \"659364180\",\r\n    \"orderNumber\": \"AFRIBANKTEST24\",\r\n    \"amount\": " + amount + ",\r\n    \"currency\": \"XAF\",\r\n    \"feesAmount\": \"" + fees + "\"\r\n}";

        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.postForEntity(url, requestEntity, String.class);
        Payment_Method paymentMethod = paymentMethodRepository.findByMethodName(meanCode);

        TransactionDto transaction = new TransactionDto(amount, "DEPOSIT", paymentMethod.getId(), initiator, walletId, null, "made", response.getBody());

        return transaction;
    }

    public TransactionDto requestTowithdraw(String adpToken, Double amount, Double fees, String meanCode, String initiator, String walletId) {
        String url = "https://twsv03.adwapay.com/requestToDisburse";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("AUTH-API-TOKEN", "Bearer "+ adpToken);
        headers.set("AUTH-API-SUBSCRIPTION", System.getenv("CASHIN-AFB-PASSWORD"));
        String requestBody = "{\r\n    \"meanCode\": \"" + meanCode + "\",\r\n    \"paymentNumber\": \"659364180\",\r\n    \"orderNumber\": \"AFRIBANKTEST24\",\r\n    \"amount\": " + amount + ",\r\n    \"currency\": \"XAF\",\r\n    \"feesAmount\": \"" + fees + "\"\r\n}";

        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.postForEntity(url, requestEntity, String.class);

        Payment_Method paymentMethod = paymentMethodRepository.findByMethodName(meanCode);

        TransactionDto transaction = new TransactionDto(amount, "WITHDRAWAL", paymentMethod.getId(), initiator, walletId, null, "made", response.getBody());

        return transaction;
    }

}
