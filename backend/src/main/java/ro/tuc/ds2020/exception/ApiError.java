package ro.tuc.ds2020.exception;

import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static java.util.Objects.isNull;

public class ApiError {
    private LocalDateTime timestamp;
    private HttpStatus errorCode;
    private List<String> errorMessages;

    public ApiError() {

    }

    public ApiError(HttpStatus errorCode, String errorMessage) {
        this.timestamp = LocalDateTime.now();
        this.errorCode = errorCode;
        if (isNull(this.errorMessages)) {
            this.errorMessages = new ArrayList<>();
        }
        this.errorMessages.add(errorMessage);
    }

    public ApiError(HttpStatus errorCode, List<String> errorMessage) {
        this.timestamp = LocalDateTime.now();
        this.errorCode = errorCode;
        this.errorMessages = errorMessage;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public HttpStatus getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(HttpStatus errorCode) {
        this.errorCode = errorCode;
    }

    public List<String> getErrorMessages() {
        return errorMessages;
    }

    public void setErrorMessages(List<String> errorMessages) {
        this.errorMessages = errorMessages;
    }
}
