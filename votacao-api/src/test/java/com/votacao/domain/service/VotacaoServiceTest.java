package com.votacao.domain.service;

import com.votacao.api.dto.voto.ContabilizacaoVoto;
import com.votacao.domain.entity.Pauta;
import com.votacao.domain.entity.Votacao;
import com.votacao.domain.exception.BusinessException;
import com.votacao.domain.exception.DataNotFoundException;
import com.votacao.domain.repository.VotacaoRepository;
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

import java.util.List;
import java.util.Optional;

import static com.votacao.domain.enums.StatusPautaEnum.NOVA;
import static com.votacao.domain.enums.StatusVotacaoEnum.AGUARDANDO_INICIO;
import static com.votacao.domain.enums.StatusVotacaoEnum.CANCELADA;
import static com.votacao.domain.enums.StatusVotacaoEnum.EM_VOTACAO;
import static com.votacao.domain.enums.StatusVotacaoEnum.ENCERRADA;
import static java.util.Optional.of;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;


@ExtendWith(MockitoExtension.class)
class VotacaoServiceTest {

    //<editor-fold desc="@Mocks" defaultstate="collapsed">

    @Mock
    private VotacaoRepository repository;

    @Mock
    private PautaService pautaService;

    @Mock
    private VotoService votoService;

    @InjectMocks
    private VotacaoService service;

    //</editor-fold>

    //<editor-fold desc="SetUp" defaultstate="collapsed">

    private Votacao entity;
    private Pauta pauta;

    @BeforeEach
    void setUp() {
        pauta = Pauta.builder()
                .duracao("00:01:00")
                .status(NOVA)
                .id(1L)
                .build();

        entity = Votacao.builder()
                .duracaoVotacao("00:01:00")
                .status(AGUARDANDO_INICIO)
                .pauta(pauta)
                .id(1L)
                .build();
    }

    //</editor-fold>

    //<editor-fold desc="@Tests" defaultstate="collapsed">

    @Test
    @DisplayName("Deve buscar votação por ID com sucesso")
    void buscarVotacaoPorId_QuandoExiste() {
        when(repository.findById(1L)).thenReturn(of(entity));

        Votacao resultado = service.findById(1L);

        assertEquals(1L, resultado.getId());
        verify(repository, times(1)).findById(1L);
    }

    @Test
    @DisplayName("Deve lançar exceção ao buscar votação por ID inexistente")
    void buscarVotacaoPorId_QuandoNaoExiste() {
        when(repository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(DataNotFoundException.class, () -> service.findById(1L));
        verify(repository, times(1)).findById(1L);
    }

    @Test
    @DisplayName("Deve salvar votação com sucesso")
    void salvarVotacao_QuandoValida() {
        when(pautaService.findById(1L)).thenReturn(pauta);
        when(repository.votacaoDuplicada(1L, 1L)).thenReturn(false);
        when(repository.save(any(Votacao.class))).thenReturn(entity);

        Votacao resultado = service.save(entity);

        assertEquals(1L, resultado.getId());
        verify(repository, times(1)).save(any(Votacao.class));
    }

    @Test
    @DisplayName("Deve lançar exceção ao salvar votação sem pauta")
    void salvarVotacao_QuandoPautaInvalida() {
        entity.setPauta(null);

        var excecao = assertThrows(BusinessException.class, () -> service.save(entity));
        assertTrue(excecao.getMessage().contains("vinculada a uma Pauta"));

        verify(repository, times(0)).save(entity);
    }

    @Test
    @DisplayName("Deve lançar exceção quando já existe votação para pauta")
    void salvarVotacao_QuandoDuplicada() {
        when(pautaService.findById(1L)).thenReturn(pauta);
        when(repository.votacaoDuplicada(1L, 1L)).thenReturn(true);

        var excecao = assertThrows(BusinessException.class, () -> service.save(entity));
        assertTrue(excecao.getMessage().contains("Já existe uma Votação"));
        verify(repository, times(0)).save(entity);
    }

    @Test
    @DisplayName("Deve criar votação com sucesso")
    void criarVotacao() {
        when(pautaService.findById(1L)).thenReturn(pauta);
        when(repository.votacaoDuplicada(any(), any())).thenReturn(false);
        when(repository.save(any(Votacao.class))).thenReturn(entity);

        Votacao resultado = service.createVoting(1L);

        assertEquals(pauta, resultado.getPauta());
        verify(repository, times(1)).save(any(Votacao.class));
    }

    @Test
    @DisplayName("Deve iniciar votação com sucesso")
    void iniciarVotacao() {
        when(repository.findById(1L)).thenReturn(of(entity));
        when(pautaService.findById(1L)).thenReturn(pauta);
        when(pautaService.save(pauta)).thenReturn(pauta);
        when(repository.save(any())).thenReturn(entity);

        Votacao resultado = service.startVoting(1L);

        assertEquals(EM_VOTACAO, resultado.getStatus());
        verify(repository, times(1)).save(entity);
    }

    @Test
    @DisplayName("Deve lançar exceção ao iniciar votação com status inválido")
    void iniciarVotacao_StatusInvalido() {
        entity.setStatus(EM_VOTACAO);

        when(repository.findById(1L)).thenReturn(of(entity));

        var excecao = assertThrows(BusinessException.class, () -> service.startVoting(1L));
        assertTrue(excecao.getMessage().contains("podem ser iniciadas"));
        verify(repository, times(0)).save(entity);
    }

    @Test
    @DisplayName("Deve encerrar votação com sucesso")
    void encerrarVotacao() {
        entity.setStatus(EM_VOTACAO);

        ContabilizacaoVoto resultado = new ContabilizacaoVoto(1L, 1L, 2L);

        when(votoService.countVote(1L)).thenReturn(resultado);
        when(repository.findById(1L)).thenReturn(of(entity));
        when(pautaService.findById(1L)).thenReturn(pauta);
        when(pautaService.save(pauta)).thenReturn(pauta);
        when(repository.save(any())).thenReturn(entity);

        Votacao encerrada = service.endVoting(1L);

        assertEquals(ENCERRADA, encerrada.getStatus());
        verify(repository, times(1)).save(entity);
    }

    @Test
    @DisplayName("Deve lançar exceção ao encerrar votação fora do status 'Em Votação'")
    void encerrarVotacao_StatusInvalido() {
        when(repository.findById(1L)).thenReturn(of(entity));

        verify(repository, times(0)).save(entity);
        assertThrows(BusinessException.class, () -> service.endVoting(1L));
    }

    @Test
    @DisplayName("Deve cancelar votação com sucesso")
    void cancelarVotacao() {
        when(repository.findById(1L)).thenReturn(of(entity));
        when(pautaService.findById(1L)).thenReturn(pauta);
        when(pautaService.save(pauta)).thenReturn(pauta);
        when(repository.save(any())).thenReturn(entity);

        Votacao cancelada = service.cancelVoting(1L);

        assertEquals(ENCERRADA, cancelada.getStatus());
        verify(repository, times(1)).save(entity);
    }

    @Test
    @DisplayName("Não deve cancelar votação já encerrada")
    void cancelarVotacao_Encerrada() {
        entity.setStatus(ENCERRADA);

        when(repository.findById(1L)).thenReturn(of(entity));

        verify(repository, times(0)).save(entity);
        assertThrows(BusinessException.class, () -> service.cancelVoting(1L));
    }

    @Test
    @DisplayName("Não deve cancelar votação já cancelada anteriormente")
    void cancelarVotacao_Cancelada() {
        entity.setStatus(CANCELADA);

        when(repository.findById(1L)).thenReturn(of(entity));

        verify(repository, times(0)).save(entity);
        assertThrows(BusinessException.class, () -> service.cancelVoting(1L));
    }

    @Test
    @DisplayName("Deve retornar paginação")
    void deveRetornarPaginacao() {
        Pageable pageable = PageRequest.of(0, 10);
        Page<Votacao> pagina = new PageImpl<>(List.of(Votacao.builder().id(1L).build()));

        when(repository.findAll(pageable)).thenReturn(pagina);

        Page<Votacao> resultado = service.pageable(pageable);

        assertEquals(1, resultado.getTotalElements());
    }

    //</editor-fold>

}
