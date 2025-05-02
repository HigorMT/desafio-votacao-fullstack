package com.votacao.api.exception;


import com.votacao.domain.exception.DataNotFoundException;
import com.votacao.domain.exception.FeignException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.Objects;
import java.util.stream.Collectors;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Slf4j
@ControllerAdvice
public class ApiExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleUncaught(Exception ex, WebRequest request) {
        HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

        log.error(ex.getMessage(), ex);

        ProblemDetail problemDetail = this.createProblemDetail(
                ex,
                httpStatus,
                "Erro na requisição",
                ex.getMessage(),
                null,
                request
        );

        return handleExceptionInternal(ex, problemDetail, new HttpHeaders(), httpStatus, request);
    }

    @ExceptionHandler(DataNotFoundException.class)
    public ResponseEntity<?> handleDataNotFoundException(DataNotFoundException ex, WebRequest request) {
        HttpStatus httpStatus = NOT_FOUND;

        ProblemDetail problemDetail = this.createProblemDetail(
                ex,
                httpStatus,
                ex.getMessage(),
                ex.getMessage(),
                null,
                request
        );

        return handleExceptionInternal(ex, problemDetail, new HttpHeaders(), httpStatus, request);
    }

    @ExceptionHandler(FeignException.class)
    public ResponseEntity<?> handleBusinessException(FeignException ex, WebRequest request) {
        HttpStatus httpStatus = HttpStatus.BAD_REQUEST;

        ProblemDetail problemDetail = this.createProblemDetail(
                ex,
                httpStatus,
                ex.getMessage(),
                ex.getMessage(),
                null,
                request
        );

        return handleExceptionInternal(ex, problemDetail, new HttpHeaders(), httpStatus, request);
    }

    @Override
    protected ResponseEntity<Object> handleExceptionInternal(Exception ex, Object body, HttpHeaders headers, HttpStatusCode statusCode, WebRequest request) {
        if (Objects.isNull(body) || body instanceof String) {
            body = this.createProblemDetail(
                    ex,
                    statusCode,
                    "Erro na requisição",
                    ex.getMessage(),
                    null,
                    request
            );
        }

        return super.handleExceptionInternal(ex, body, headers, statusCode, request);
    }

    @Override
    protected ProblemDetail createProblemDetail(Exception ex, HttpStatusCode status, String message, String detail, Object[] detailMessageArguments, WebRequest request) {
        ProblemDetail problemDetail = super.createProblemDetail(ex, status, message, detail, detailMessageArguments, request);

        problemDetail.setDetail(detail);
        problemDetail.setProperty("message", message);

        return problemDetail;
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        String arguments = ex.getBindingResult().getAllErrors().stream()
                .map(DefaultMessageSourceResolvable::getDefaultMessage)
                .collect(Collectors.joining(" "));

        ProblemDetail problemDetail = this.createProblemDetail(
                ex,
                status,
                String.format("Um ou mais campos estão inválidos: %s", arguments),
                ex.getBody().getDetail(),
                null,
                request
        );

        return handleExceptionInternal(ex, problemDetail, headers, status, request);
    }

    @Override
    protected ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        ProblemDetail problemDetail = this.createProblemDetail(
                ex,
                status,
                "Erro na requisição",
                ex.getMessage(),
                null,
                request
        );

        return handleExceptionInternal(ex, problemDetail, headers, status, request);
    }

}
