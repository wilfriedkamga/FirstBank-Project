package com.example.AssociationManagement.Controller;

import com.example.AssociationManagement.Business.RemboursementBus;
import com.example.AssociationManagement.Dao.Dto.RemboursementDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/associations/remboursements")
public class RemboursementController {

    @Autowired
    private RemboursementBus remboursementBus;

    @GetMapping
    public ResponseEntity<List<RemboursementDto>> getAllRemboursements() {
        List<RemboursementDto> remboursements = remboursementBus.getAllRemboursements();
        return ResponseEntity.ok(remboursements);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RemboursementDto> getRemboursementById(@PathVariable String id) {
        Optional<RemboursementDto> remboursement = remboursementBus.getRemboursementById(id);
        return remboursement.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<RemboursementDto> createRemboursement(@RequestBody RemboursementDto remboursementDto) {
        RemboursementDto createdRemboursement = remboursementBus.createRemboursement(remboursementDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdRemboursement);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RemboursementDto> updateRemboursement(@PathVariable String id, @RequestBody RemboursementDto remboursementDto) {
        RemboursementDto updatedRemboursement = remboursementBus.updateRemboursement(id, remboursementDto);
        return updatedRemboursement != null ? ResponseEntity.ok(updatedRemboursement) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRemboursement(@PathVariable String id) {
        remboursementBus.deleteRemboursement(id);
        return ResponseEntity.noContent().build();
    }
}
