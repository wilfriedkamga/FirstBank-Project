package com.UserManagement.dao.model;

import org.springframework.web.multipart.MultipartFile;

import javax.persistence.Column;

public class UploadFileModel {

        private MultipartFile cniRecto;
        private MultipartFile cniVerso;
        private MultipartFile photo;
        private MultipartFile signature;
        private String phone;

        // Constructeur, getters et setters

        public MultipartFile getCniRecto() {
            return cniRecto;
        }

        public void setCniRecto(MultipartFile cniRecto) {
            this.cniRecto = cniRecto;
        }

        public MultipartFile getCniVerso() {
            return cniVerso;
        }

        public void setCniVerso(MultipartFile cniVerso) {
            this.cniVerso = cniVerso;
        }

        public MultipartFile getPhoto() {
            return photo;
        }

        public void setPhoto(MultipartFile photo) {
            this.photo = photo;
        }

        public MultipartFile getSignature() {
            return signature;
        }

        public void setSignature(MultipartFile signature) {
            this.signature = signature;
        }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}