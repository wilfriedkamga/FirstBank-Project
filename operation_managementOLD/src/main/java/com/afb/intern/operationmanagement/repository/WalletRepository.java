package com.afb.intern.operationmanagement.repository;

import com.afb.intern.operationmanagement.models.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WalletRepository extends JpaRepository<Wallet, String> {
    Optional<Wallet> findByOwner(String owner);
}
