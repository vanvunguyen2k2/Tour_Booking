package com.vti.dulichviet_team_1.config.exception;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties({"stackTrace", "cause", "suppressed", "localizedMessage"})
public class AppException extends RuntimeException {
    private int status;

    private Instant timestamp;
    private String message;
    private String path;

    public AppException(int status, String message) {
        this.status = status;
        this.message = message;
        this.timestamp = Instant.now();
    }

    public AppException(ErrorEnum errorEnum) {
        this.timestamp = Instant.now();
        this.status = errorEnum.status;
        this.message = errorEnum.message;

    }

}
