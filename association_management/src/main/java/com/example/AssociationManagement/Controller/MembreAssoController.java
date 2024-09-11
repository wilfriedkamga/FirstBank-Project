package com.example.AssociationManagement.Controller;

import com.example.AssociationManagement.Business.MembreAssoBus;
import com.example.AssociationManagement.Dao.Dto.MembreAssoDto;
import com.example.AssociationManagement.Dao.Entity.Membre_Asso;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/associations/{id}/membres")
public class MembreAssoController {

    @Autowired
    private MembreAssoBus membreAssoService;

    @GetMapping
    public ResponseEntity<List<Membre_Asso>> getAllMembres() {
        List<Membre_Asso> membres = membreAssoService.getAllMembres();
        return ResponseEntity.ok(membres);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Membre_Asso> getMembreById(@PathVariable String id) {
        Optional<Membre_Asso> membre = membreAssoService.getMembreById(id);
        return membre.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Membre_Asso> createMembre(@RequestBody MembreAssoDto dto) {
        Membre_Asso membre = membreAssoService.createMembre(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(membre);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Membre_Asso> updateMembre(@PathVariable String id, @RequestBody MembreAssoDto dto) {
        Membre_Asso membre = membreAssoService.updateMembre(id, dto);
        return membre != null ? ResponseEntity.ok(membre) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMembre(@PathVariable String id) {
        membreAssoService.deleteMembre(id);
        return ResponseEntity.noContent().build();
    }
}
