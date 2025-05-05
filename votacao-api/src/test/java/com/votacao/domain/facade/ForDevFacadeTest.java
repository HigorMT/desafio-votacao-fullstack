package com.votacao.domain.facade;

import com.votacao.api.dto.fordevs.PessoaResponse;
import com.votacao.domain.entity.Cooperado;
import com.votacao.domain.exception.FeignException;
import com.votacao.infrastruct.feign.Feign4Dev;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static java.util.Collections.emptyList;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.anyMap;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ForDevFacadeTest {

    //<editor-fold desc="@Mocks" defaultstate="collapsed">

    @Mock
    private Feign4Dev feign4Dev;

    @InjectMocks
    private ForDevFacade facade;

    //</editor-fold>

    //<editor-fold desc="Setup" defaultstate="collapsed">

    @BeforeEach
    void setUp() {
        facade = new ForDevFacade(feign4Dev);
    }

    //</editor-fold>

    //<editor-fold desc="@Tests" defaultstate="collapsed">

    @Test
    @DisplayName("Deve gerar cooperado com sucesso usando resposta válida da API 4Devs")
    void generatePerson_QuandoRespostaValida() {
        PessoaResponse pessoaResponse = new PessoaResponse();
        pessoaResponse.setNome("João da Silva");

        when(feign4Dev.gerarPessoa(anyMap())).thenReturn(List.of(pessoaResponse));

        String cpf = "12345678900";

        Cooperado cooperado = facade.generatePerson(cpf);

        assertEquals("João da Silva", cooperado.getNome());
        assertEquals(cpf, cooperado.getCpf());
        verify(feign4Dev, times(1)).gerarPessoa(anyMap());
    }

    @Test
    @DisplayName("Deve lançar FeignException quando resposta da API for null")
    void generatePerson_QuandoRespostaNull() {
        when(feign4Dev.gerarPessoa(anyMap())).thenReturn(null);

        FeignException exception = assertThrows(FeignException.class, () -> facade.generatePerson("12345678900"));

        assertEquals("Falha na Comunicação com a API 4Devs.", exception.getMessage());
        verify(feign4Dev, times(1)).gerarPessoa(anyMap());
    }

    @Test
    @DisplayName("Deve lançar FeignException quando resposta da API for vazia")
    void generatePerson_QuandoRespostaVazia() {
        when(feign4Dev.gerarPessoa(anyMap())).thenReturn(emptyList());

        FeignException exception = assertThrows(FeignException.class, () -> facade.generatePerson("12345678900"));

        assertEquals("Falha na Comunicação com a API 4Devs.", exception.getMessage());
        verify(feign4Dev, times(1)).gerarPessoa(anyMap());
    }

    @Test
    @DisplayName("Deve lançar FeignException quando ocorrer exceção na chamada da API")
    void generatePerson_QuandoFalhaNaChamada() {
        when(feign4Dev.gerarPessoa(anyMap())).thenThrow(new RuntimeException("Erro genérico"));

        FeignException exception = assertThrows(FeignException.class, () -> facade.generatePerson("12345678900"));

        assertEquals("Falha na Comunicação com a API 4Devs.", exception.getMessage());
        verify(feign4Dev, times(1)).gerarPessoa(anyMap());
    }

    //</editor-fold>

}
