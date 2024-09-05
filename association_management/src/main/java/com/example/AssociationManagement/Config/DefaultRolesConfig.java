package com.example.AssociationManagement.Config;

import com.example.AssociationManagement.HelperClass.DefaultRole;
import com.example.AssociationManagement.HelperClass.VarParam;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.List;

@Configuration
public class DefaultRolesConfig {

    @Value("${default.roles.file}")
    private Resource rolesFile;

    @Value("${var.params.file}")
    private Resource varParamsFile;

    private List<DefaultRole> defaultRoles;

    private VarParam varParam;

    @PostConstruct
    public void loadDefaultRoles() throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        this.defaultRoles = objectMapper.readValue(rolesFile.getInputStream(), new TypeReference<List<DefaultRole>>() {});
        this.varParam=objectMapper.readValue(varParamsFile.getInputStream(), new TypeReference<VarParam>() {});
    }

    public List<DefaultRole> getDefaultRoles() {
        return defaultRoles;
    }
    public VarParam getVarParam(){return varParam;}
}
