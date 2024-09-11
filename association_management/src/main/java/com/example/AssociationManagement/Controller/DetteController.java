package com.example.AssociationManagement.Controller;

import com.example.AssociationManagement.Business.DetteBus;
import com.example.AssociationManagement.Dao.Dto.DetteDto;
import com.example.AssociationManagement.Dao.Entity.Dette;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/associaitions/reunions/dettes")
public class DetteController {

    @Autowired
    private DetteBus detteBus;

    @GetMapping
    public ResponseEntity<List<Dette>> getAllDettes() {
        List<Dette> dettes = detteBus.findAll();
        return new ResponseEntity<>(dettes, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Dette>> getDetteById(@PathVariable String id) {
        Optional<Dette> dette = detteBus.findById(id);
        return dette.isPresent() ? new ResponseEntity<>(dette, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<Dette> createDette(@RequestBody DetteDto detteDto) {
        Dette dette = detteBus.save(detteDto);
        return new ResponseEntity<>(dette, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Dette> updateDette(@PathVariable String id, @RequestBody DetteDto detteDto) {
        Dette updatedDette = detteBus.update(detteDto, id);
        return updatedDette != null ? new ResponseEntity<>(updatedDette, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDette(@PathVariable String id) {
        detteBus.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
