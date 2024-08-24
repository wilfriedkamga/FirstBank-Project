package com.afb.intern.operationmanagement.repository;

import com.afb.intern.operationmanagement.models.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction, String> {
}
