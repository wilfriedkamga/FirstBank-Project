package com.example.AssociationManagement.CustomException;


import com.example.AssociationManagement.Dao.Modele.CommonResponseModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    String message="Error while processing";
    String codeError="1";
    @ExceptionHandler(AssociationAlreadyExistsException.class)
    public ResponseEntity<?> handleAssociationAlreadyExistsException(AssociationAlreadyExistsException ex) {
        CommonResponseModel response=new CommonResponseModel(message,codeError,ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<?> handleUserNotFoundException(UserNotFoundException ex) {
        CommonResponseModel response=new CommonResponseModel(message,codeError,ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
    }
    @ExceptionHandler(AssociationNotFoundException.class)
    public ResponseEntity<?> handleAssociationNotFoundException(AssociationNotFoundException ex) {
        CommonResponseModel response=new CommonResponseModel(message,codeError,ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(RoleAlreadyExistException.class)
    public ResponseEntity<?> handleRoleAlreadyExistException(RoleAlreadyExistException ex) {
        CommonResponseModel response=new CommonResponseModel(message,codeError,ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(UndeletableRoleException.class)
    public ResponseEntity<?> handleUndeletableRoleException(UndeletableRoleException ex) {
        CommonResponseModel response=new CommonResponseModel(message,codeError,ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
    }

}