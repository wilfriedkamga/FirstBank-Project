package com.UserManagement.dao.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DownloadimageDto {
    String imageBase64;

    public String getImageBase64() {
        return imageBase64;
    }

    public void setImageBase64(String imageBase64) {
        this.imageBase64 = imageBase64;
    }
}
