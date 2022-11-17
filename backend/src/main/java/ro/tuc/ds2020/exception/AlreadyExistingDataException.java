package ro.tuc.ds2020.exception;

public class AlreadyExistingDataException extends RuntimeException {
    public AlreadyExistingDataException(String message) {
        super(message);
    }
}
