package com.afb.intern.operationmanagement.repository;

import com.afb.intern.operationmanagement.models.Payment_Method;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PaymentMethodRepository extends JpaRepository<Payment_Method, String> {
    Payment_Method findByMethodName(String meanCode);
}
