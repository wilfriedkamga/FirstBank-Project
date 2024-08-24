package com.afb.intern.savingsplanmanagement.service;

import com.afb.intern.savingsplanmanagement.dto.CRUDDto;
import com.afb.intern.savingsplanmanagement.dto.NotificationDto;
import com.afb.intern.savingsplanmanagement.dto.SavOpsDto;
import com.afb.intern.savingsplanmanagement.exceptions.AppException;
import com.afb.intern.savingsplanmanagement.models.Saving;
import com.afb.intern.savingsplanmanagement.repository.SavingsPlanRepository;
import com.afb.intern.savingsplanmanagement.dto.SavingsDto;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SavingsPlanService {
    private final SavingsPlanRepository savingsPlanRepository;
    private final ModelMapper modelMapper = new ModelMapper();

    @Value("${NOTIFICATION_URL}")
    private String notificationURL;

    public SavingsDto createSaving(SavingsDto plandto){
        Saving plan = modelMapper.map(plandto, Saving.class);
        LocalDate today = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate startDate = LocalDate.parse(plandto.getStartDate().toInstant().atZone(ZoneId.systemDefault()).format(formatter), formatter);
        plan.setId(UUID.randomUUID().toString());
        if (startDate.isAfter(today)) {
            plan.setStatus("Incoming");
        } else if (startDate.equals(today)) {
            plan.setStatus("Ongoing");
        }
        plan.setSavingBalance(0.00);


        NotificationDto notif = NotificationDto.builder()
                .Id(UUID.randomUUID().toString())
                .msg("Saving " + plandto.getReason() + " has successfully created")
                .recipient(Set.of(plan.getPhone()))
                .frontendDisplay(true)
                .build();
        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<Void> response = restTemplate.postForEntity(notificationURL +"/storeNotification", notif, Void.class);

        if (response.getStatusCode() == HttpStatus.CREATED) {
            System.out.println("Notification sent successfully");
        } else {
            System.out.println("Error sending notification: " + response.getStatusCode());
        }
        Saving saved = savingsPlanRepository.save(plan);

        return plandto;
    }

    @Scheduled(fixedRate = 60000)
    public void updateSavingsStatus() {
        List<Saving> savings = savingsPlanRepository.findAll();

        for (Saving saving : savings) {
            LocalDate today = LocalDate.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDate startDate = LocalDate.parse(saving.getStartDate().toInstant().atZone(ZoneId.systemDefault()).format(formatter), formatter);
            LocalDate dueDate = LocalDate.parse(saving.getDueDate().toInstant().atZone(ZoneId.systemDefault()).format(formatter), formatter);

            if (startDate.isBefore(today) || startDate.equals(today)) {
                if (dueDate.isAfter(today)) {
                    saving.setStatus("Ongoing");
                } else if (dueDate.isBefore(today)) {
                    saving.setStatus("Completed");
                }
            } else if (startDate.isAfter(today)) {
                saving.setStatus("Incoming");
            }

            savingsPlanRepository.save(saving);
        }
    }

    public List<Saving> getAllSavingsByUser(String phone){
        List<Saving> savings = savingsPlanRepository.findAllByPhone(phone);
        return savings;
    }

    public Saving getSavingsById(String id) {
        Saving saving = savingsPlanRepository.findById(id)
                .orElseThrow(() -> new AppException("Saving not found", HttpStatus.NOT_FOUND));
        return saving;
    }

    public List<Saving> getSavingsByName(String phone, String name){
        List<Saving> savingList = savingsPlanRepository.findAllByPhone(phone);
        List<Saving> savings = savingList.stream()
                .filter(saving -> saving.getReason().equals(name))
                .collect(Collectors.toList());
        return savings;
    }

    public List<Saving> getSavingsByStatus(String phone, String status){
        List<Saving> savingList = savingsPlanRepository.findAllByPhone(phone);
        List<Saving> savings = savingList.stream()
                .filter(saving -> saving.getStatus().equals(status))
                .collect(Collectors.toList());
        return savings;
    }

    public Saving updateSavings(CRUDDto newSavinfo) {
        Saving savingConcerned = savingsPlanRepository.findById(newSavinfo.getId())
                .orElseThrow(() -> new AppException("Something wrong", HttpStatus.INTERNAL_SERVER_ERROR));
        savingConcerned.setReason(newSavinfo.getReason());
        savingConcerned.setStartDate(newSavinfo.getStartDate());
        savingConcerned.setDueDate(newSavinfo.getDueDate());
        savingConcerned.setAmountTarget(newSavinfo.getAmountTarget());
        savingConcerned.setReminder(newSavinfo.getReminder());

        LocalDate today = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate startDate = LocalDate.parse(newSavinfo.getStartDate().toInstant().atZone(ZoneId.systemDefault()).format(formatter), formatter);
        if (startDate.isAfter(today)) {
            savingConcerned.setStatus("Incoming");
        } else if (startDate.equals(today)) {
            savingConcerned.setStatus("Ongoing");
        }
        Saving saving = savingsPlanRepository.save(savingConcerned);
        return savingConcerned;
    }

    public SavingsDto updateSavingsWith(SavOpsDto opsDto) {
        Saving savings = savingsPlanRepository.findById(opsDto.getId())
                .orElseThrow(()-> new AppException("Something wrong", HttpStatus.INTERNAL_SERVER_ERROR));
        savings.setSavingBalance(savings.getSavingBalance() - opsDto.getSavingBalance());
        savings.setStatus(opsDto.getStatus());

        savingsPlanRepository.save(savings);
        return modelMapper.map(savings, SavingsDto.class);
    }

    public SavingsDto updateSavingsContr(SavOpsDto opsDto) {
        Saving saving = savingsPlanRepository.findById(opsDto.getId())
                .orElseThrow(() -> new AppException("Something wrong", HttpStatus.INTERNAL_SERVER_ERROR));
        saving.setSavingBalance(saving.getSavingBalance() + opsDto.getSavingBalance());

        savingsPlanRepository.save(saving);
        return modelMapper.map(saving, SavingsDto.class);
    }

    public void deleteSavings(CRUDDto saving) {
        Saving sav = savingsPlanRepository.findById(saving.getId())
                .orElseThrow(() -> new AppException("Something wrong happened", HttpStatus.INTERNAL_SERVER_ERROR));

        NotificationDto notif = NotificationDto.builder()
                .Id(UUID.randomUUID().toString())
                .msg("Saving " + saving.getReason() + " has successfully deleted")
                .recipient(Set.of(sav.getPhone()))
                .frontendDisplay(true)
                .build();
        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<Void> response = restTemplate.postForEntity(notificationURL +"/storeNotification", notif, Void.class);

        if (response.getStatusCode() == HttpStatus.CREATED) {
            System.out.println("Notification sent successfully");
        } else {
            System.out.println("Error sending notification: " + response.getStatusCode());
        }

        savingsPlanRepository.delete(sav);
    }
}
