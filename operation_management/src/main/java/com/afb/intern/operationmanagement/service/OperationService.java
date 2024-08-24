package com.afb.intern.operationmanagement.service;

import com.afb.intern.operationmanagement.dto.*;
import com.afb.intern.operationmanagement.exceptions.AppException;
import com.afb.intern.operationmanagement.models.Payment_Method;
import com.afb.intern.operationmanagement.models.Transaction;
import com.afb.intern.operationmanagement.models.Wallet;
import com.afb.intern.operationmanagement.repository.PaymentMethodRepository;
import com.afb.intern.operationmanagement.repository.TransactionRepository;
import com.afb.intern.operationmanagement.repository.WalletRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.http.client.support.BasicAuthenticationInterceptor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
@RequiredArgsConstructor
public class OperationService {

    private final TransactionRepository transactionRepository;
    private final WalletRepository walletRepository;
    private final PaymentMethodRepository paymentMethodRepository;
    private Map<UserType, ContributeToSavingsPlanStrategy> contributeStrategies;
    private Map<UserType, WithdrawFromSavingsPlanStrategy> withdrawStrategies;
    private final ModelMapper modelMapper = new ModelMapper();

    @Value("${CASHIN-AFB-PASSWORD}")
    private String cashinpswrd;

    public WalletDto createWalletForUser(CreationDto walletDto) {
        Wallet wallet = new Wallet();
        wallet.setId(UUID.randomUUID().toString());
        wallet.setOwner(walletDto.getPhoneNum());
        wallet.setCode(walletDto.getCode());
        wallet.setBalance(0.00);
        wallet.setWallet_type("personal");
        Wallet created = walletRepository.save(wallet);
        return modelMapper.map(wallet, WalletDto.class);
    }

    public WalletDto getAccountBalance(String owner){
        Wallet wallet = walletRepository.findByOwner(owner)
                .orElseThrow(() -> new AppException("wrong owner id", HttpStatus.NOT_FOUND));
        WalletDto walletDto = modelMapper.map(wallet, WalletDto.class);
        walletDto.setAccountBalance(wallet.getBalance());
        return walletDto;
    }

    public Payment_Method addPaymentMethod(String method) {
        Optional<Payment_Method> paymentMethod = Optional.ofNullable(paymentMethodRepository.findByMethodName(method));

        if(paymentMethod.isEmpty()){
            Payment_Method payment_method = new Payment_Method(UUID.randomUUID().toString(), method);

            paymentMethodRepository.save(payment_method);

            return payment_method;
        }

        return null;
    }

    public Wallet getWalletByOwner(String owner){
        Wallet wallet = walletRepository.findByOwner(owner)
                .orElseThrow(()-> new AppException("Something wrong inside the server", HttpStatus.INTERNAL_SERVER_ERROR));
        return wallet;
    }

    public TransactionDto contributeToSavingsPlan(UserDto user, ContributeToSavingsPlanDto dto) {
        ContributeToSavingsPlanStrategy strategy = contributeStrategies.get(user.getUserType());
        return strategy.contribute(dto);
    }

    public TransactionDto simpleUsercontributeToSavingsPlan(ContributeToSavingsPlanDto dto) throws JsonProcessingException {
        Wallet wallet = walletRepository.findById(dto.getWalletId())
                .orElseThrow(() -> new AppException("Something happened inside the server", HttpStatus.INTERNAL_SERVER_ERROR));
        Payment_Method paymentMethod = paymentMethodRepository.findById(dto.getPaymentMethodId())
                .orElseThrow(() -> new AppException("Something happened to the server", HttpStatus.INTERNAL_SERVER_ERROR));

        String adpToken = getADPToken();
        List<FeesDto> fees = getFees(adpToken, dto.getAmount());
        TransactionDto transactionDto = new TransactionDto();
        if (paymentMethod.getMethodName().equals("ORANGE-MONEY")) {
            Double fee = 0.000;

            for (FeesDto f : fees) {
                if (f.getMeanCode().equals("ORANGE-MONEY")) {
                    fee = f.getFeesAmount();
                    break;
                }
            }

            transactionDto = requestToPay(adpToken, dto.getAmount(), fee, paymentMethod.getMethodName(), dto.getInitiator(), dto.getWalletId());
        } else if (paymentMethod.getMethodName().equals("MOBILE-MONEY")) {
            Double fee = 0.00;

            for (FeesDto f : fees) {
                if (f.getMeanCode().equals("MOBILE-MONEY")) {
                    fee = f.getFeesAmount();
                    break;
                }
            }
            transactionDto = requestToPay(adpToken, dto.getAmount(), fee, paymentMethod.getMethodName(), dto.getInitiator(), dto.getWalletId());
        }
        if (transactionDto != null) {
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
        }

        return transactionDto;
    }

    public TransactionDto simpleUserwithdrawFromSavings(WithdrawFromSavingsDto dto) throws JsonProcessingException {
        Wallet wallet = walletRepository.findById(dto.getWalletId())
                .orElseThrow(()-> new AppException("Something happened to the server", HttpStatus.INTERNAL_SERVER_ERROR));
        Payment_Method paymentMethod = paymentMethodRepository.findById(dto.getPaymentMethodId())
                .orElseThrow(()-> new AppException("Something happened to the server", HttpStatus.INTERNAL_SERVER_ERROR));
        String adpToken = getADPToken();
        List<FeesDto> fees = getFees(adpToken, dto.getAmount());
        TransactionDto transactionDto = new TransactionDto();
        if (paymentMethod.getMethodName().equals("ORANGE-MONEY")){
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
            wallet.setBalance(wallet.getBalance() - dto.getAmount());

            String url = "http://localhost:8085/savingsplanManagement/update-savings/withdr";

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<SavingsDto> request= new HttpEntity<>(new SavingsDto(dto.getSavingsPlanId(), "Completed", dto.getSavingBalance()), headers);

            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<SavingsDto> response = restTemplate.exchange(url, HttpMethod.PUT, request, SavingsDto.class);
            if (response.getStatusCode() == HttpStatus.OK) {
                SavingsDto savings = response.getBody();
                System.out.println("account balance updated");
            } else {
                throw new AppException("Error updating account balance", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        return transactionDto;
    }

    public TransactionDto collectorContributeToSavings(ContributeToSavingsPlanDto dto) throws JsonProcessingException {
        Wallet wallet = walletRepository.findById(dto.getWalletId())
                .orElseThrow(()-> new AppException("Something happen inside the server", HttpStatus.INTERNAL_SERVER_ERROR));
        Payment_Method paymentMethod = paymentMethodRepository.findById(dto.getPaymentMethodId())
                .orElseThrow(()-> new AppException("Something happened to the server", HttpStatus.INTERNAL_SERVER_ERROR));
        String adpToken = getADPToken();
        List<FeesDto> fees = getFees(adpToken, dto.getAmount());
        TransactionDto transactionDto = new TransactionDto();
        if (paymentMethod.getMethodName().equals("ORANGE-MONEY")){
            Double fee = 0.000;

            for (FeesDto f : fees) {
                if (f.getMeanCode().equals("ORANGE-MONEY")) {
                    fee = f.getFeesAmount();
                    break;
                }
            }
            transactionDto = requestToPay(adpToken, dto.getAmount(), fee, paymentMethod.getMethodName(), dto.getInitiator(), dto.getWalletId());
        } else if (paymentMethod.getMethodName().equals("MOBILE-MONEY")){
            Double fee = 0.00;

            for (FeesDto f : fees) {
                if (f.getMeanCode().equals("MOBILE-MONEY")) {
                    fee = f.getFeesAmount();
                    break;
                }
            }
            transactionDto = requestToPay(adpToken, dto.getAmount(), fee, paymentMethod.getMethodName(), dto.getInitiator(), dto.getWalletId());
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
        }
        return transactionDto;
    }

    public TransactionDto bankAgentwithdrawFromSaving(WithdrawFromSavingsDto dto) throws JsonProcessingException {
        Wallet wallet = walletRepository.findById(dto.getWalletId())
                .orElseThrow(()-> new AppException("Something happen inside the server", HttpStatus.INTERNAL_SERVER_ERROR));
        Payment_Method paymentMethod = paymentMethodRepository.findById(dto.getPaymentMethodId())
                .orElseThrow(()-> new AppException("Something happened to the server", HttpStatus.INTERNAL_SERVER_ERROR));
        String adpToken = getADPToken();
        List<FeesDto> fees = getFees(adpToken, dto.getAmount());
        TransactionDto transactionDto = new TransactionDto();
        if (dto.getCode().equals(wallet.getCode())){
            if (paymentMethod.getMethodName().equals("ORANGE-MONEY")){
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
                wallet.setBalance(wallet.getBalance() - dto.getAmount());

                String url = "http://localhost:8085/savingsplanManagement/update-savings/withdr";

                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_JSON);
                HttpEntity<SavingsDto> request= new HttpEntity<>(new SavingsDto(dto.getSavingsPlanId(), "Completed", dto.getSavingBalance()), headers);

                RestTemplate restTemplate = new RestTemplate();
                ResponseEntity<SavingsDto> response = restTemplate.exchange(url, HttpMethod.PUT, request, SavingsDto.class);
                if (response.getStatusCode() == HttpStatus.OK) {
                    SavingsDto savings = response.getBody();
                    System.out.println("account balance updated");
                } else {
                    throw new AppException("Error updating account balance", HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }
        }
        return transactionDto;
    }

    public TransactionDto withdrawFromSavingsPlan(UserDto user, WithdrawFromSavingsDto dto) {
        WithdrawFromSavingsPlanStrategy strategy = withdrawStrategies.get(user.getUserType());
        return strategy.withdraw(dto);
    }

    public String getADPToken() {
        String url = "https://twsv03.adwapay.com/getADPToken";

        ADPToken adpToken = new ADPToken("AP5DDSMP9KXXJFA2P");

        RestTemplate restTemplate = new RestTemplate();

        restTemplate.getInterceptors().add(
                new BasicAuthenticationInterceptor("AFRILANDFIRSTBANK01", "AF5DDSMP9KXX01"));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<ADPToken> entity = new HttpEntity<>(adpToken, headers);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);
        if (response.getStatusCode() == HttpStatus.OK){
            return response.getBody();
        } else {
            throw new AppException("The Server is underway maintenance, update the code", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public List<FeesDto> getFees(String adpToken, Double amount) throws JsonProcessingException {
        String url = "https://twsv03.adwapay.com/getFees";

        FeesRequest request = new FeesRequest(amount, "XAF");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        headers.set("AUTH-API-TOKEN", "Bearer "+ adpToken);
        headers.set("AUTH-API-SUBSCRIPTION", cashinpswrd);
        HttpEntity<FeesRequest> entity = new HttpEntity<>(request, headers);
        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);

        if (response.getStatusCode() == HttpStatus.OK) {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response.getBody());
            JsonNode dataArray = root.get("data");

            // Create a list of FeesDto objects
            List<FeesDto> feesDtoList = new ArrayList<>();

            for (JsonNode dataObject : dataArray) {
                String meanCode = dataObject.get("meanCode").asText();
                Double feesAmount = dataObject.get("feesAmount").asDouble();

                // Build and add FeesDto to the list
                FeesDto feesDto = FeesDto.builder()
                        .meanCode(meanCode)
                        .feesAmount(feesAmount)
                        .build();

                feesDtoList.add(feesDto);
            }

            return feesDtoList;
        } else {
            throw new AppException("The Server is underway maintenance, update the code", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public TransactionDto requestToPay(String adpToken, Double amount, Double fees, String meanCode, String initiator, String walletId) {
        String url = "https://twsv03.adwapay.com/requestToPay";
        RequestToPay request = new RequestToPay(
                meanCode,
                initiator,
                "AFRIBANKTEST24",
                amount,
                "XAF",
                fees
        );
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("AUTH-API-TOKEN", "Bearer "+ adpToken);
        headers.set("AUTH-API-SUBSCRIPTION", cashinpswrd);
        RestTemplate restTemplate = new RestTemplate();
        HttpEntity<RequestToPay> entity = new HttpEntity<>(request, headers);

        // Send the POST request
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);

        Payment_Method paymentMethod = paymentMethodRepository.findByMethodName(meanCode);

        TransactionDto transaction = new TransactionDto(amount, "WITHDRAWAL", paymentMethod.getId(), initiator, walletId, null, "made", response.getBody());

        return transaction;
    }

    public TransactionDto requestTowithdraw(String adpToken, Double amount, Double fees, String meanCode, String initiator, String walletId) {
        String url = "https://twsv03.adwapay.com/requestToDisburse";

        RequestToPay request = new RequestToPay(
                meanCode,
                initiator,
                "AFRIBANKTEST24",
                amount,
                "XAF",
                fees
        );
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("AUTH-API-TOKEN", "Bearer "+ adpToken);
        headers.set("AUTH-API-SUBSCRIPTION", cashinpswrd);
        RestTemplate restTemplate = new RestTemplate();
        HttpEntity<RequestToPay> entity = new HttpEntity<>(request, headers);

        // Send the POST request
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);

        Payment_Method paymentMethod = paymentMethodRepository.findByMethodName(meanCode);

        TransactionDto transaction = new TransactionDto(amount, "WITHDRAWAL", paymentMethod.getId(), initiator, walletId, null, "made", response.getBody());

        return transaction;
    }

    public List<Payment_Method> getAllPaymentMethods() {
        List<Payment_Method> paymentMethods = paymentMethodRepository.findAll();
        return paymentMethods;
    }
}
