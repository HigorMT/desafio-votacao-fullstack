package com.votacao.domain.service;

import com.votacao.domain.entity.Pauta;
import com.votacao.domain.exception.BusinessException;
import com.votacao.domain.exception.DataNotFoundException;
import com.votacao.domain.repository.PautaRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static com.votacao.domain.enums.StatusPautaEnum.EM_VOTACAO;
import static com.votacao.domain.enums.StatusPautaEnum.NOVA;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class PautaServiceTest {

    //<editor-fold desc="@Mocks" defaultstate="collapsed">

    @InjectMocks
    private PautaService service;

    @Mock
    private PautaRepository repository;

    //</editor-fold>

    //<editor-fold desc="Setup" defaultstate="collapsed">

    private Pauta pauta;

    @BeforeEach
    void setUp() {
        pauta = Pauta.builder()
                .dataAtualizacao(LocalDateTime.now())
                .dataCriacao(LocalDateTime.now())
                .descricao("Descrição da pauta")
                .nome("Pauta Teste")
                .duracao("00:01:00")
                .status(NOVA)
                .id(1L)
                .build();
    }

    //</editor-fold>

    //<editor-fold desc="@Tests" defaultstate="collapsed">

    @Test
    @DisplayName("Deve buscar pauta por ID com sucesso")
    void buscarPautaPorId_QuandoExiste() {
        when(repository.findById(1L)).thenReturn(Optional.of(pauta));

        Pauta resultado = service.findById(1L);

        assertEquals(1L, resultado.getId());
        assertEquals("Pauta Teste", resultado.getNome());
        verify(repository, times(1)).findById(1L);
    }

    @Test
    @DisplayName("Deve lançar exceção ao buscar pauta inexistente")
    void buscarPautaPorId_QuandoNaoExiste() {
        when(repository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(DataNotFoundException.class, () -> service.findById(1L));
        verify(repository, times(1)).findById(1L);
    }

    @Test
    @DisplayName("Deve retornar paginação de pautas")
    void pageable_DeveRetornarPagina() {
        Pageable pageable = PageRequest.of(0, 10);
        Page<Pauta> page = new PageImpl<>(List.of(pauta));
        when(repository.findAll(pageable)).thenReturn(page);

        Page<Pauta> resultado = service.pageable(pageable);

        assertEquals(1, resultado.getTotalElements());
        verify(repository, times(1)).findAll(pageable);
    }

    @Test
    @DisplayName("Deve salvar pauta com sucesso")
    void salvarPauta_ComSucesso() {
        when(repository.save(pauta)).thenReturn(pauta);

        Pauta resultado = service.save(pauta);

        assertEquals(pauta.getId(), resultado.getId());
        verify(repository, times(1)).save(pauta);
    }

    @Test
    @DisplayName("Deve atualizar pauta com sucesso quando status for NOVA")
    void atualizarPauta_QuandoStatusForNova() {
        when(repository.findById(1L)).thenReturn(Optional.of(pauta));
        when(repository.save(pauta)).thenReturn(pauta);

        Pauta resultado = service.update(pauta, 1L);

        assertEquals(pauta.getId(), resultado.getId());
        verify(repository, times(1)).findById(1L);
        verify(repository, times(1)).save(pauta);
    }

    @Test
    @DisplayName("Deve lançar exceção ao tentar atualizar pauta com status diferente de NOVA")
    void atualizarPauta_QuandoStatusInvalido() {
        pauta.setStatus(EM_VOTACAO);
        when(repository.findById(1L)).thenReturn(Optional.of(pauta));

        BusinessException ex = assertThrows(BusinessException.class, () -> service.update(pauta, 1L));
        assertTrue(ex.getMessage().contains("Apenas Pautas com status 'Nova'"));

        verify(repository, times(1)).findById(1L);
        verify(repository, never()).save(any());
    }

    //</editor-fold>

}
