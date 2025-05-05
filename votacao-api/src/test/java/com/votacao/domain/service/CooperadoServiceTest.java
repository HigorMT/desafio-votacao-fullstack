package com.votacao.domain.service;

import com.votacao.api.dto.cooperado.ValidacaoCooperadoVoto;
import com.votacao.domain.entity.Cooperado;
import com.votacao.domain.exception.BusinessException;
import com.votacao.domain.exception.DataNotFoundException;
import com.votacao.domain.facade.CooperadoFacade;
import com.votacao.domain.facade.ForDevFacade;
import com.votacao.domain.repository.CooperadoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static com.votacao.domain.enums.StatusCoopVotoEnum.ABLE_TO_VOTE;
import static java.lang.String.format;
import static java.util.Optional.of;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CooperadoServiceTest {

    //<editor-fold desc="@Mocks" defaultstate="collapsed">

    @Mock
    private CooperadoRepository repository;

    @Mock
    private ForDevFacade forDevFacade;

    @Mock
    private CooperadoFacade facade;

    @InjectMocks
    private CooperadoService service;

    //</editor-fold>

    //<editor-fold desc="Setup" defaultstate="collapsed">

    private Cooperado entity;

    @BeforeEach
    void setUp() {
        entity = Cooperado.builder()
                .cpf("294.525.100-05")
                .nome("Teste")
                .id(1L)
                .build();
    }

    //</editor-fold>

    //<editor-fold desc="@Tests" defaultstate="collapsed">

    @Test
    @DisplayName("Deve buscar cooperado pelo ID com sucesso")
    void buscarCooperadoPorId_QuandoExisteRegistro() {
        when(repository.findById(1L)).thenReturn(of(entity));

        Cooperado result = service.findById(1L);

        assertNotNull(result);
        assertEquals(entity.getId(), result.getId());
        verify(repository).findById(1L);
    }

    @Test
    @DisplayName("Deve lançar erro ao buscar cooperado pelo ID")
    void buscarCooperadoPorId_QuandoNaoExisteRegistro_DeveLancarExcecao() {
        when(repository.findById(1L)).thenReturn(Optional.empty());

        DataNotFoundException ex = assertThrows(DataNotFoundException.class, () -> service.findById(1L));

        assertEquals("Cooperado com ID 1 não encontrado.", ex.getMessage());
    }

    @Test
    @DisplayName("Deve buscar cooperado pelo CPF com sucesso")
    void buscarCooperadoPorCpf_QuandoExisteRegistro() {
        String cpfTest = "294.525.100-05";

        when(repository.findByCpf(cpfTest)).thenReturn(of(entity));

        Cooperado result = service.findByCpf(cpfTest);

        assertEquals(entity.getCpf(), result.getCpf());
        verify(repository).findByCpf(cpfTest);
    }

    @Test
    @DisplayName("Deve lançar erro ao buscar cooperado pelo CPF")
    void buscarCooperadoPorCpf_QuandoNaoExisteRegistro_DeveLancarExcecao() {
        String cpfTest = "294.525.100-05";

        when(repository.findByCpf(cpfTest)).thenReturn(Optional.empty());

        DataNotFoundException ex = assertThrows(DataNotFoundException.class, () -> service.findByCpf(cpfTest));

        assertEquals(format("Cooperado com CPF %s não encontrado.", cpfTest), ex.getMessage());
    }

    @Test
    @DisplayName("Deve retornar Optional ao buscar cooperado pelo CPF")
    void buscarOptionalCooperadoPorCpf_QuandoExisteRegistro() {
        String cpfTest = "294.525.100-05";

        when(repository.findByCpf(cpfTest)).thenReturn(of(entity));

        Optional<Cooperado> result = service.findByCpfOpt(cpfTest);

        assertTrue(result.isPresent());
        assertEquals(cpfTest, result.get().getCpf());
    }

    @Test
    @DisplayName("Deve salvar Cooperado com dados válidos")
    void salvar_QuandoDadosValidos() {
        when(repository.save(any())).thenReturn(entity);

        Cooperado result = service.save(entity);

        assertEquals(entity.getId(), result.getId());
    }

    @Test
    @DisplayName("Deve lancar erro ao salvar com CPF NULL ou vázio")
    void salvar_QuandoCpfInvalido_DeveLancarExcecao() {
        entity.setCpf(null);

        BusinessException ex = assertThrows(BusinessException.class, () -> service.save(entity));
        assertEquals("O CPF do Cooperado deve ser informado.", ex.getMessage());

        entity.setCpf("");
        ex = assertThrows(BusinessException.class, () -> service.save(entity));
        assertEquals("O CPF do Cooperado deve ser informado.", ex.getMessage());
    }

    @Test
    @DisplayName("Deve lancar erro ao salvar com Nome NULL ou vázio")
    void salvar_QuandoNomeInvalido_DeveLancarExcecao() {
        entity.setNome(null);

        BusinessException ex = assertThrows(BusinessException.class, () -> service.save(entity));
        assertEquals("O Nome do Cooperado deve ser informado.", ex.getMessage());

        entity.setNome("");
        ex = assertThrows(BusinessException.class, () -> service.save(entity));
        assertEquals("O Nome do Cooperado deve ser informado.", ex.getMessage());
    }

    @Test
    @DisplayName("Deve retornar Cooperado existente quando realizar busca pelo CPF")
    void buscarOuGerarCooperado_QuandoRegistroExiste() {
        when(repository.findByCpf("123")).thenReturn(of(entity));

        Cooperado result = service.findOrGenerate("123");

        assertEquals(entity.getId(), result.getId());
        verify(repository).findByCpf("123");
    }

    @Test
    @DisplayName("Deve gerar novo Cooperado quando realizar busca pelo CPF")
    void buscarOuGerarCooperado_QuandoRegistroNaoExiste() {
        Cooperado novo = Cooperado.builder().cpf("123").nome("Gerado").build();

        when(repository.findByCpf("123")).thenReturn(Optional.empty());
        when(forDevFacade.generatePerson("123")).thenReturn(novo);
        when(repository.save(novo)).thenReturn(entity);

        Cooperado result = service.findOrGenerate("123");

        assertEquals(entity.getId(), result.getId());
        verify(forDevFacade).generatePerson("123");
        verify(repository).save(novo);
    }

    @Test
    @DisplayName("Deve validar CPF com sucesso")
    void validarCpf_QuandoCpfValido() {
        when(facade.verificaDigitosVerificadoresCPF("123")).thenReturn(true);
        when(facade.validateToVote()).thenReturn(ABLE_TO_VOTE);

        ValidacaoCooperadoVoto result = service.validateToVote("123");

        assertEquals(ABLE_TO_VOTE, result.getStatus());
    }

    @Test
    @DisplayName("Deve lançar erro ao validar CPF")
    void validarCpf_QuandoCpfInvalido() {
        when(facade.verificaDigitosVerificadoresCPF("123")).thenReturn(false);

        DataNotFoundException ex = assertThrows(DataNotFoundException.class, () -> service.validateToVote("123"));

        assertEquals("CPF inválido.", ex.getMessage());
    }

    //</editor-fold>

}
