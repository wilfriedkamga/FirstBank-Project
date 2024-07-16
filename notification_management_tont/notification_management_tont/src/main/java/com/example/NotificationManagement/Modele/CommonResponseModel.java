package com.example.NotificationManagement.Modele;

public class CommonResponseModel {
    private String message;
    private String responseCode;
    private Object data;

    // Getters et Setters

    public CommonResponseModel(String message, String responseCode, Object data) {
        this.message = message;
        this.responseCode = responseCode;
        this.data = data;
    }

    public CommonResponseModel() {
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getResponseCode() {
        return responseCode;
    }

    public void setResponseCode(String responseCode) {
        this.responseCode = responseCode;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
