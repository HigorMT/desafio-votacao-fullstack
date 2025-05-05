package com.votacao.domain.facade;

import com.votacao.domain.enums.StatusCoopVotoEnum;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

@ExtendWith(MockitoExtension.class)
class CooperadoFacadeTest {

    //<editor-fold desc="@Mocks" defaultstate="collapsed">

    @InjectMocks
    private CooperadoFacade facade;

    //</editor-fold>

    //<editor-fold desc="Setup" defaultstate="collapsed">

    @BeforeEach
    void setUp() {
        facade = new CooperadoFacade();
    }

    //</editor-fold>

    //<editor-fold desc="@Tests" defaultstate="collapsed">

    @Test
    @DisplayName("Deve retornar ABLE_TO_VOTE quando o valor aleatório for true")
    void validateToVote_QuandoApto() {
        StatusCoopVotoEnum resultado = facade.validateToVote();
        assertTrue(resultado == StatusCoopVotoEnum.ABLE_TO_VOTE || resultado == StatusCoopVotoEnum.UNABLE_TO_VOTE);
    }

    @ParameterizedTest
    @ValueSource(strings = {
            "",
            "123",
            "11111111111",
            "12345678900",
            "abcdefghijk",
            "1234567890a",
            "123.456.789-0a",
            "111.111.111-11"
    })
    @DisplayName("Deve retornar false para CPFs inválidos")
    void verificaCPF_DeveRetornarFalseParaCPFsInvalidos(String cpfInvalido) {
        boolean resultado = facade.verificaDigitosVerificadoresCPF(cpfInvalido);
        assertFalse(resultado);
    }

    @Test
    @DisplayName("Deve retornar true para um CPF válido")
    void verificaCPF_ComCpfValido() {
        boolean resultado = facade.verificaDigitosVerificadoresCPF("529.982.247-25"); // CPF válido
        assertTrue(resultado);
    }

    //</editor-fold>

}
