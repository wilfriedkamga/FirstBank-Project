package com.example.AssociationManagement.CustomException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;

public class AssociationNotFoundException extends RuntimeException {
    public AssociationNotFoundException(String message) {
        super(message);
    }
}
