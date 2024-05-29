package com.afb.intern.savingsplanmanagement.controllers;

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
@RequiredArgsConstructor
@CrossOrigin
public class SavingsPlanController {

    private final SavingsPlanService savingsPlanService;

    @PostMapping("/savingsplanManagement/create-savings")
    public ResponseEntity<SavingsDto> create(@RequestBody SavingsDto saving){
        SavingsDto sav = savingsPlanService.createSaving(saving);
        return ResponseEntity.ok(sav);
    }

    @GetMapping("/savingsplanManagement/get-all-savings/{phone}")
    public ResponseEntity<List<Saving>> getAllSavingsByUser(@PathVariable String phone) {
        List<Saving> savings = savingsPlanService.getAllSavingsByUser(phone);
        return new ResponseEntity<>(savings, HttpStatus.OK);
    }

    @GetMapping("/savingsplanManagement/get-all-savings/{phone}/{name}")
    public ResponseEntity<List<Saving>> getSavingsByName(@PathVariable String phone, @PathVariable String name) {
        List<Saving> savings = savingsPlanService.getSavingsByName(phone, name);
        return new ResponseEntity<>(savings, HttpStatus.OK);
    }

    @GetMapping("/savingsplanManagement/get-all-savings/{phone}/{status}")
    public ResponseEntity<List<Saving>> getSavingsByStatus(@PathVariable String phone, @PathVariable String status) {
        List<Saving> savings = savingsPlanService.getSavingsByStatus(phone, status);

        return new ResponseEntity<>(savings, HttpStatus.OK);
    }

    @PutMapping("/savingsplanManagement/update-savings/{phone}/{id}")
    public ResponseEntity<Saving> updateSaving(@RequestBody Saving saving) {
        Saving updated = savingsPlanService.updateSavings(saving);

        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/savingsplanManagement/update-savings/{phone}/{id}")
    public ResponseEntity<Void> deleteSaving(@RequestBody Saving saving) {
        savingsPlanService.deleteSavings(saving);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
