package com.example.AssociationManagement.Controller;

import com.example.AssociationManagement.Business.MembreTontBus;
import com.example.AssociationManagement.Dao.Dto.MembreTontDto;
import com.example.AssociationManagement.Dao.Entity.Membre_Tont;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/associations/membres-tontines")
public class MembreTontController {

    @Autowired
    private MembreTontBus membreTontBus;

    @GetMapping
    public ResponseEntity<List<Membre_Tont>> getAllMembresTont() {
        List<Membre_Tont> membresTont = membreTontBus.getAllMembresTont();
        return ResponseEntity.ok(membresTont);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Membre_Tont> getMembreTontById(@PathVariable String id) {
        Optional<Membre_Tont> membreTont = membreTontBus.getMembreTontById(id);
        return membreTont.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Membre_Tont> createMembreTont(@RequestBody MembreTontDto membreTontDto) {
        Membre_Tont membreTont = membreTontBus.createMembreTont(membreTontDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(membreTont);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Membre_Tont> updateMembreTont(@PathVariable String id, @RequestBody MembreTontDto membreTontDto) {
        Membre_Tont membreTont = membreTontBus.updateMembreTont(id, membreTontDto);
        return membreTont != null ? ResponseEntity.ok(membreTont) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMembreTont(@PathVariable String id) {
        membreTontBus.deleteMembreTont(id);
        return ResponseEntity.noContent().build();
    }
}
