package com.example.AssociationManagement.Controller;
import com.example.AssociationManagement.Business.PrivilegeAssoBus;
import com.example.AssociationManagement.Dao.Dto.PrivilegeAssoDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/associations/privileges-association")
public class PrivilegeAssoController {

    @Autowired
    private PrivilegeAssoBus privilegeAssoBus;

    @GetMapping
    public ResponseEntity<List<PrivilegeAssoDto>> getAllPrivileges() {
        List<PrivilegeAssoDto> privileges = privilegeAssoBus.getAllPrivileges();
        return ResponseEntity.ok(privileges);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PrivilegeAssoDto> getPrivilegeById(@PathVariable String id) {
        Optional<PrivilegeAssoDto> privilege = privilegeAssoBus.getPrivilegeById(id);
        return privilege.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<PrivilegeAssoDto> createPrivilege(@RequestBody PrivilegeAssoDto privilegeAssoDto) {
        PrivilegeAssoDto createdPrivilege = privilegeAssoBus.createPrivilege(privilegeAssoDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdPrivilege);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PrivilegeAssoDto> updatePrivilege(@PathVariable String id, @RequestBody PrivilegeAssoDto privilegeAssoDto) {
        PrivilegeAssoDto updatedPrivilege = privilegeAssoBus.updatePrivilege(id, privilegeAssoDto);
        return updatedPrivilege != null ? ResponseEntity.ok(updatedPrivilege) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePrivilege(@PathVariable String id) {
        privilegeAssoBus.deletePrivilege(id);
        return ResponseEntity.noContent().build();
    }
}
