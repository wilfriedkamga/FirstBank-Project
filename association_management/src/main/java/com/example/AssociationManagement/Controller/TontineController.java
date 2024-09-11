package com.example.AssociationManagement.Controller;

import com.example.AssociationManagement.Business.TontineBus;
import com.example.AssociationManagement.Dao.Dto.TontineDto;
import com.example.AssociationManagement.Dao.Entity.Tontine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/associations/tontines")
public class TontineController {

    @Autowired
    private TontineBus tontineService;

    @GetMapping
    public ResponseEntity<List<Tontine>> getAllTontines() {
        List<Tontine> tontines = tontineService.getAllTontines();
        return ResponseEntity.ok(tontines);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tontine> getTontineById(@PathVariable String id) {
        Optional<Tontine> tontine = tontineService.getTontineById(id);
        return tontine.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Tontine> createTontine(@RequestBody TontineDto tontineDTO) {
        Tontine tontine = tontineService.createTontine(tontineDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(tontine);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tontine> updateTontine(@PathVariable String id, @RequestBody TontineDto tontineDTO) {
        Tontine tontine = tontineService.updateTontine(id, tontineDTO);
        return tontine != null ? ResponseEntity.ok(tontine) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTontine(@PathVariable String id) {
        tontineService.deleteTontine(id);
        return ResponseEntity.noContent().build();
    }
}
