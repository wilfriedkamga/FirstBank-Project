package com.example.AssociationManagement.Controller;

import com.example.AssociationManagement.Business.CagnotteBus;
import com.example.AssociationManagement.Dao.Dto.CagnotteDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/associations/cagnottes")
public class CagnotteController {

    @Autowired
    private CagnotteBus cagnotteBus;

    @GetMapping
    public ResponseEntity<List<CagnotteDto>> getAllCagnottes() {
        List<CagnotteDto> cagnottes = cagnotteBus.getAllCagnottes();
        return ResponseEntity.ok(cagnottes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CagnotteDto> getCagnotteById(@PathVariable String id) {
        Optional<CagnotteDto> cagnotte = cagnotteBus.getCagnotteById(id);
        return cagnotte.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<CagnotteDto> createCagnotte(@RequestBody CagnotteDto cagnotteDto) {
        CagnotteDto createdCagnotte = cagnotteBus.createCagnotte(cagnotteDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCagnotte);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CagnotteDto> updateCagnotte(@PathVariable String id, @RequestBody CagnotteDto cagnotteDto) {
        CagnotteDto updatedCagnotte = cagnotteBus.updateCagnotte(id, cagnotteDto);
        return updatedCagnotte != null ? ResponseEntity.ok(updatedCagnotte) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCagnotte(@PathVariable String id) {
        cagnotteBus.deleteCagnotte(id);
        return ResponseEntity.noContent().build();
    }
}
