package com.TontineManagement.dao.repositories;

import com.TontineManagement.dao.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    User findByPhoneAndPassword(String phone, String password);

    Optional<User> findByPhone(String phone);

}