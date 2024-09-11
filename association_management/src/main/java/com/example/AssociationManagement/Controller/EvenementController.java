package com.example.AssociationManagement.Controller;

import com.example.AssociationManagement.Business.EvenementBus;
import com.example.AssociationManagement.Dao.Dto.EvenementDto;
import com.example.AssociationManagement.Dao.Entity.Evenement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/associations/evenements")
public class EvenementController {

    @Autowired
    private EvenementBus evenementBus;

    @GetMapping
    public ResponseEntity<List<EvenementDto>> getAllEvenements() {
        List<EvenementDto> evenements = evenementBus.getAllEvenements();
        return ResponseEntity.ok(evenements);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EvenementDto> getEvenementById(@PathVariable String id) {
        Optional<EvenementDto> evenement = evenementBus.getEvenementById(id);
        return evenement.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<EvenementDto> createEvenement(@RequestBody EvenementDto evenementDto) {
        EvenementDto createdEvenement = evenementBus.createEvenement(evenementDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdEvenement);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EvenementDto> updateEvenement(@PathVariable String id, @RequestBody EvenementDto evenementDto) {
        EvenementDto updatedEvenement = evenementBus.updateEvenement(id, evenementDto);
        return updatedEvenement != null ? ResponseEntity.ok(updatedEvenement) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvenement(@PathVariable String id) {
        evenementBus.deleteEvenement(id);
        return ResponseEntity.noContent().build();
    }
}
