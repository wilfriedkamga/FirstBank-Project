package com.example.AssociationManagement.Controller;
import com.example.AssociationManagement.Business.SanctionBus;
import com.example.AssociationManagement.Dao.Dto.SanctionDto;
import com.example.AssociationManagement.Dao.Entity.Sanction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/associations/sanctions")
public class SanctionController {

    @Autowired
    private SanctionBus sanctionBus;

    @GetMapping
    public ResponseEntity<List<Sanction>> getAllSanctions() {
        List<Sanction> sanctions = sanctionBus.getAllSanctions();
        return ResponseEntity.ok(sanctions);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sanction> getSanctionById(@PathVariable String id) {
        Optional<Sanction> sanction = sanctionBus.getSanctionById(id);
        return sanction.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Sanction> createSanction(@RequestBody SanctionDto sanctionDto) {
        Sanction sanction = sanctionBus.createSanction(sanctionDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(sanction);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Sanction> updateSanction(@PathVariable String id, @RequestBody SanctionDto sanctionDto) {
        Sanction sanction = sanctionBus.updateSanction(id, sanctionDto);
        return sanction != null ? ResponseEntity.ok(sanction) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSanction(@PathVariable String id) {
        sanctionBus.deleteSanction(id);
        return ResponseEntity.noContent().build();
    }
}
