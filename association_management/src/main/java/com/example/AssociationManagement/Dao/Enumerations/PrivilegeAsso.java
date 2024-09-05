package com.example.AssociationManagement.Dao.Enumerations;

import org.springframework.jdbc.support.incrementer.AbstractDataFieldMaxValueIncrementer;

public enum PrivilegeAsso {
    SUPERADMIN,
    ADMIN,
    CENSEUR,
    SECRETAIRE,
    TRESORIER,
    PLANIFIEUR
}
