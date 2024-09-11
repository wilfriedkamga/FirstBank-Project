package com.example.AssociationManagement.Controller;

import com.example.AssociationManagement.Business.RoleTontBus;
import com.example.AssociationManagement.Dao.Dto.RoleTontDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/roles-tontine")
public class RoleTontController {

    @Autowired
    private RoleTontBus roleTontBus;

    @GetMapping
    public ResponseEntity<List<RoleTontDto>> getAllRoles() {
        List<RoleTontDto> roles = roleTontBus.getAllRoles();
        return ResponseEntity.ok(roles);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoleTontDto> getRoleById(@PathVariable String id) {
        Optional<RoleTontDto> role = roleTontBus.getRoleById(id);
        return role.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<RoleTontDto> createRole(@RequestBody RoleTontDto roleTontDto) {
        RoleTontDto createdRole = roleTontBus.createRole(roleTontDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdRole);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RoleTontDto> updateRole(@PathVariable String id, @RequestBody RoleTontDto roleTontDto) {
        RoleTontDto updatedRole = roleTontBus.updateRole(id, roleTontDto);
        return updatedRole != null ? ResponseEntity.ok(updatedRole) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRole(@PathVariable String id) {
        roleTontBus.deleteRole(id);
        return ResponseEntity.noContent().build();
    }
}
