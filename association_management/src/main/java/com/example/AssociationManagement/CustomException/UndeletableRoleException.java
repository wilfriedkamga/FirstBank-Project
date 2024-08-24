package com.example.AssociationManagement.CustomException;

public class UndeletableRoleException extends RuntimeException  {
    public UndeletableRoleException(String message) {
        super(message);
    }
}

