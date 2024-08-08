package com.UserManagement.dao.repositories;

import com.UserManagement.dao.entities.UploadFile;
import com.UserManagement.dao.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UploadFileRepository extends JpaRepository<UploadFile, String> {


}