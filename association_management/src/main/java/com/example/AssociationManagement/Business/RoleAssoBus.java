package com.example.AssociationManagement.Business;
import com.example.AssociationManagement.Dao.Dto.RoleAssoDto;
import com.example.AssociationManagement.Dao.Entity.Role_Asso;
import com.example.AssociationManagement.Dao.Repository.RoleAssoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RoleAssoBus {

    @Autowired
    private RoleAssoRepository roleAssoRepository;

    public List<Role_Asso> getAllRolesAsso() {
        return roleAssoRepository.findAll();
    }

    public Optional<Role_Asso> getRoleAssoById(String id) {
        return roleAssoRepository.findById(id);
    }

    public Role_Asso createRoleAsso(RoleAssoDto roleAssoDto) {
        Role_Asso roleAsso = new Role_Asso();
        updateRoleAssoFromDto(roleAsso, roleAssoDto);
        return roleAssoRepository.save(roleAsso);
    }

    public Role_Asso updateRoleAsso(String id, RoleAssoDto roleAssoDto) {
        Optional<Role_Asso> existingRoleAssoOpt = roleAssoRepository.findById(id);
        if (existingRoleAssoOpt.isPresent()) {
            Role_Asso roleAsso = existingRoleAssoOpt.get();
            updateRoleAssoFromDto(roleAsso, roleAssoDto);
            return roleAssoRepository.save(roleAsso);
        }
        return null;
    }

    public void deleteRoleAsso(String id) {
        roleAssoRepository.deleteById(id);
    }

    private void updateRoleAssoFromDto(Role_Asso roleAsso, RoleAssoDto roleAssoDto) {
        roleAsso.setLabel(roleAssoDto.getLabel());
        roleAsso.setLabelV(roleAssoDto.getLabelV());
        roleAsso.setDeletable(roleAssoDto.isDeletable());
        roleAsso.setState(roleAssoDto.getState());
        roleAsso.setNbMaxOcc(roleAssoDto.getNbMaxOcc());
        // Association and privileges need to be handled separately, likely using services for those entities
    }
}
