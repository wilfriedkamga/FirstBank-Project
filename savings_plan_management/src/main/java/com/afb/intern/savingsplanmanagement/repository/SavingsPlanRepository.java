package com.afb.intern.savingsplanmanagement.repository;

import com.afb.intern.savingsplanmanagement.models.Saving;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SavingsPlanRepository extends JpaRepository<Saving, String> {
    List<Saving> findAllByPhone(String phone);
}
