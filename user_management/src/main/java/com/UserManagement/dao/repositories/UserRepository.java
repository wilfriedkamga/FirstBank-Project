package com.UserManagement.dao.repositories;

import com.UserManagement.dao.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    User findByPhoneAndPassword(String phone, String password);

    Optional<User> findByPhone(String phone);

}