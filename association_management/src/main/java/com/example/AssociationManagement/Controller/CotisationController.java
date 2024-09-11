package com.example.AssociationManagement.Controller;

import com.example.AssociationManagement.Business.CotisationBus;
import com.example.AssociationManagement.Dao.Dto.CotisationDto;
import com.example.AssociationManagement.Dao.Entity.Cotisation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/associaitions/reunions/cotisations")
public class CotisationController {

    @Autowired
    private CotisationBus cotisationService;

    @GetMapping("/")
    public ResponseEntity<List<Cotisation>> getAllCotisations() {
        List<Cotisation> cotisations = cotisationService.findAll();
        return new ResponseEntity<>(cotisations, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Cotisation>> getCotisationById(@PathVariable String id) {
        Optional<Cotisation> cotisation = cotisationService.findById(id);
        return cotisation.isPresent() ? new ResponseEntity<>(cotisation, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<Cotisation> createCotisation(@RequestBody CotisationDto cotisationDTO) {
        Cotisation cotisation = cotisationService.save(cotisationDTO);
        return new ResponseEntity<>(cotisation, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cotisation> updateCotisation(@PathVariable String id, @RequestBody CotisationDto cotisationDTO) {
        Cotisation updatedCotisation = cotisationService.update(cotisationDTO, id);
        return updatedCotisation != null ? new ResponseEntity<>(updatedCotisation, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCotisation(@PathVariable String id) {
        cotisationService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
