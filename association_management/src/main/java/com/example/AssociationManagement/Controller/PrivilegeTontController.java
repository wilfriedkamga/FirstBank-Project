package com.example.AssociationManagement.Controller;

import com.example.AssociationManagement.Business.PrivilegeTontBus;
import com.example.AssociationManagement.Dao.Dto.PrivilegeTontDto;
import com.example.AssociationManagement.Dao.Entity.Privilege_Tont;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/associations/privileges-tontine")
public class PrivilegeTontController {

    @Autowired
    private PrivilegeTontBus privilegeTontBus;

    @GetMapping
    public ResponseEntity<List<Privilege_Tont>> getAllPrivileges() {
        List<Privilege_Tont> privileges = privilegeTontBus.getAllPrivileges();
        return ResponseEntity.ok(privileges);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Privilege_Tont> getPrivilegeById(@PathVariable String id) {
        Optional<Privilege_Tont> privilege = privilegeTontBus.getPrivilegeById(id);
        return privilege.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Privilege_Tont> createPrivilege(@RequestBody PrivilegeTontDto privilegeTontDto) {
        Privilege_Tont createdPrivilege = privilegeTontBus.createPrivilege(privilegeTontDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdPrivilege);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Privilege_Tont> updatePrivilege(@PathVariable String id, @RequestBody PrivilegeTontDto privilegeTontDto) {
        Privilege_Tont updatedPrivilege = privilegeTontBus.updatePrivilege(id, privilegeTontDto);
        return updatedPrivilege != null ? ResponseEntity.ok(updatedPrivilege) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePrivilege(@PathVariable String id) {
        privilegeTontBus.deletePrivilege(id);
        return ResponseEntity.noContent().build();
    }
}
