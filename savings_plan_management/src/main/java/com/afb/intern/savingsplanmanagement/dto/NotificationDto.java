package com.afb.intern.savingsplanmanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class NotificationDto {

    private String Id;
    private String msg;
    private Set<String> recipient;
    private boolean frontendDisplay;
}
