package com.afb.intern.savingsplanmanagement.service;

import com.afb.intern.savingsplanmanagement.exceptions.AppException;
import com.afb.intern.savingsplanmanagement.models.Saving;
import com.afb.intern.savingsplanmanagement.repository.SavingsPlanRepository;
import com.afb.intern.savingsplanmanagement.dto.SavingsDto;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SavingsPlanService {
    private final SavingsPlanRepository savingsPlanRepository;
    private final ModelMapper modelMapper = new ModelMapper();

    public SavingsDto createSaving(SavingsDto plandto){
        Saving plan = modelMapper.map(plandto, Saving.class);
        plan.setId(UUID.randomUUID().toString());
        plan.setStatus("Ongoing");
        plan.setSavingBalance(0.00);
        Saving saved = savingsPlanRepository.save(plan);
        return plandto;
    }

    public List<Saving> getAllSavingsByUser(String phone){
        List<Saving> savings = savingsPlanRepository.findAllByPhone(phone);
        return savings;
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

    public Saving updateSavings(Saving newSavinfo) {
        Saving savingConcerned = savingsPlanRepository.findById(newSavinfo.getId())
                .orElseThrow(() -> new AppException("Something wrong", HttpStatus.INTERNAL_SERVER_ERROR));

        savingConcerned = newSavinfo;
        Saving saving = savingsPlanRepository.save(savingConcerned);
        return savingConcerned;
    }

    public void deleteSavings(Saving saving) {
        Saving sav = savingsPlanRepository.findById(saving.getId())
                .orElseThrow(() -> new AppException("Something wrong happened", HttpStatus.INTERNAL_SERVER_ERROR));

        savingsPlanRepository.delete(sav);
    }
}
