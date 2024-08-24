package com.afb.intern.savtont.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class SmsRequest {

    private String senderId;
    private String message;
    private List<String> msisdn;
    private boolean maskedMsisdn;
    private String flag;
}
