package com.examly.springapp.exception;

public class SameNameException extends RuntimeException {
    public SameNameException(String message){
        super(message);
    }
}
