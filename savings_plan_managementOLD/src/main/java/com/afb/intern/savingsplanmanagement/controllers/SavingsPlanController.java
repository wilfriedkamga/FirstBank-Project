package com.afb.intern.savingsplanmanagement.controllers;

import com.afb.intern.savingsplanmanagement.dto.CRUDDto;
import com.afb.intern.savingsplanmanagement.dto.SavOpsDto;
import com.afb.intern.savingsplanmanagement.dto.SavingsDto;
import com.afb.intern.savingsplanmanagement.models.Saving;
import com.afb.intern.savingsplanmanagement.service.SavingsPlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/savingsplanManagement")
@RequiredArgsConstructor
public class SavingsPlanController {

    private final SavingsPlanService savingsPlanService;

    @PostMapping("/create-savings")
    public ResponseEntity<SavingsDto> create(@RequestBody SavingsDto saving){
        SavingsDto sav = savingsPlanService.createSaving(saving);
        return ResponseEntity.ok(sav);
    }

    @GetMapping("/get-all-savings/{phone}")
    public ResponseEntity<List<Saving>> getAllSavingsByUser(@PathVariable String phone) {
        List<Saving> savings = savingsPlanService.getAllSavingsByUser(phone);
        return new ResponseEntity<>(savings, HttpStatus.OK);
    }

    @GetMapping("/get-saving/{id}")
    public ResponseEntity<Saving> getSavingById(@PathVariable String id) {
        Saving saving = savingsPlanService.getSavingsById(id);
        return new ResponseEntity<>(saving, HttpStatus.OK);
    }

    @GetMapping("/get-all-plans/{phone}/{status}")
    public ResponseEntity<List<Saving>> getSavingsByStatus(@PathVariable String phone, @PathVariable String status) {
        List<Saving> savings = savingsPlanService.getSavingsByStatus(phone, status);

        return new ResponseEntity<>(savings, HttpStatus.OK);
    }

    @PutMapping("/update-savings/{phone}/{id}")
    public ResponseEntity<Saving> updateSaving(@RequestBody CRUDDto saving) {
        Saving updated = savingsPlanService.updateSavings(saving);

        return ResponseEntity.ok(updated);
    }

    @PutMapping("/update-savings/contri")
    public ResponseEntity<SavingsDto> updateSvingBal(@RequestBody SavOpsDto opsDto) {
        SavingsDto updated = savingsPlanService.updateSavingsContr(opsDto);
        return ResponseEntity.ok(updated);
    }

    @PutMapping("/update-savings/withdr")
    public ResponseEntity<SavingsDto> updateSavingWith(@RequestBody SavOpsDto opsDto) {
        SavingsDto updated = savingsPlanService.updateSavingsWith(opsDto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/delete-saving")
    public ResponseEntity<Void> deleteSaving(@RequestBody CRUDDto saving) {
        savingsPlanService.deleteSavings(saving);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
