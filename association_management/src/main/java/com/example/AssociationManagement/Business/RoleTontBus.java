package com.example.AssociationManagement.Business;

import com.example.AssociationManagement.Dao.Dto.RoleTontDto;
import com.example.AssociationManagement.Dao.Entity.Privilege_Tont;
import com.example.AssociationManagement.Dao.Entity.Role_Tont;
import com.example.AssociationManagement.Dao.Repository.RoleTontRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RoleTontBus {

    @Autowired
    private RoleTontRepository roleTontRepository;

    public List<RoleTontDto> getAllRoles() {
        return roleTontRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public Optional<RoleTontDto> getRoleById(String id) {
        return roleTontRepository.findById(id)
                .map(this::convertToDto);
    }

    public RoleTontDto createRole(RoleTontDto roleTontDto) {
        Role_Tont roleTont = convertToEntity(roleTontDto);
        Role_Tont savedRoleTont = roleTontRepository.save(roleTont);
        return convertToDto(savedRoleTont);
    }

    public RoleTontDto updateRole(String id, RoleTontDto roleTontDto) {
        if (roleTontRepository.existsById(id)) {
            Role_Tont roleTont = convertToEntity(roleTontDto);
            roleTont.setId(id);
            Role_Tont updatedRoleTont = roleTontRepository.save(roleTont);
            return convertToDto(updatedRoleTont);
        }
        return null;
    }

    public void deleteRole(String id) {
        roleTontRepository.deleteById(id);
    }

    private RoleTontDto convertToDto(Role_Tont roleTont) {
        RoleTontDto dto = new RoleTontDto();
        dto.setId(roleTont.getId());
        dto.setLabel(roleTont.getLabel());
        dto.setDeletable(roleTont.isDeletable());
        dto.setTontineId(roleTont.getTontine().getId());
        dto.setPrivilegeIds(roleTont.getPrivileges_tont().stream()
                .map(Privilege_Tont::getId)
                .collect(Collectors.toList()));
        return dto;
    }

    private Role_Tont convertToEntity(RoleTontDto dto) {
        Role_Tont roleTont = new Role_Tont();
        roleTont.setLabel(dto.getLabel());
        roleTont.setDeletable(dto.isDeletable());
        // Assuming Tontine and Privilege_Tont are fetched or created elsewhere
        // roleTont.setTontine(tontineService.getTontineById(dto.getTontineId()));
        // roleTont.setPrivileges_tont(privilegeTontService.getPrivilegesByIds(dto.getPrivilegeTontIds()));
        return roleTont;
    }
}
