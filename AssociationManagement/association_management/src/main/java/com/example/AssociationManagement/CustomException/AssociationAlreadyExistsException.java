package com.example.AssociationManagement.CustomException;

public class AssociationAlreadyExistsException extends RuntimeException {
    public AssociationAlreadyExistsException(String message) {
        super(message);
    }
}