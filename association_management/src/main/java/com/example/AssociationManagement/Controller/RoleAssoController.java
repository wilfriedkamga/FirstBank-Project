package com.example.AssociationManagement.Controller;

import com.example.AssociationManagement.Business.RoleAssoBus;
import com.example.AssociationManagement.Dao.Dto.RoleAssoDto;
import com.example.AssociationManagement.Dao.Entity.Role_Asso;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/associations/roles")
public class RoleAssoController {

    @Autowired
    private RoleAssoBus roleAssoBus;

    @GetMapping
    public ResponseEntity<List<Role_Asso>> getAllRolesAsso() {
        List<Role_Asso> rolesAsso = roleAssoBus.getAllRolesAsso();
        return ResponseEntity.ok(rolesAsso);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Role_Asso> getRoleAssoById(@PathVariable String id) {
        Optional<Role_Asso> roleAsso = roleAssoBus.getRoleAssoById(id);
        return roleAsso.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Role_Asso> createRoleAsso(@RequestBody RoleAssoDto roleAssoDto) {
        Role_Asso roleAsso = roleAssoBus.createRoleAsso(roleAssoDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(roleAsso);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Role_Asso> updateRoleAsso(@PathVariable String id, @RequestBody RoleAssoDto roleAssoDto) {
        Role_Asso roleAsso = roleAssoBus.updateRoleAsso(id, roleAssoDto);
        return roleAsso != null ? ResponseEntity.ok(roleAsso) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoleAsso(@PathVariable String id) {
        roleAssoBus.deleteRoleAsso(id);
        return ResponseEntity.noContent().build();
    }
}
