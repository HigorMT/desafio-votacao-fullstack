package com.votacao.domain.service;

import com.votacao.api.dto.voto.ContabilizacaoVoto;
import com.votacao.domain.entity.Voto;
import com.votacao.domain.entity.VotoId;
import com.votacao.domain.enums.VotoEnum;
import com.votacao.domain.exception.BusinessException;
import com.votacao.domain.repository.VotoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class VotoServiceTest {

    //<editor-fold desc="@Mocks" defaultstate="collapsed">

    @InjectMocks
    private VotoService service;

    @Mock
    private VotoRepository repository;

    //</editor-fold>

    //<editor-fold desc="Setup" defaultstate="collapsed">

    private Voto voto;
    private VotoId votoId;
    private ContabilizacaoVoto contabilizacao;

    @BeforeEach
    void setUp() {
        votoId = new VotoId();
        votoId.setCooperadoId(1L);
        votoId.setVotacaoId(100L);

        voto = Voto.builder()
                .id(votoId)
                .decisao(VotoEnum.SIM)
                .build();

        contabilizacao = ContabilizacaoVoto.builder()
                .votosTotais(10L)
                .votosFavoraveis(7L)
                .build();
    }

    //</editor-fold>

    //<editor-fold desc="@Tests" defaultstate="collapsed">

    @Test
    @DisplayName("Deve contar votos de uma votação com sucesso")
    void contarVotos_ComSucesso() {
        when(repository.countVote(100L)).thenReturn(contabilizacao);

        ContabilizacaoVoto resultado = service.countVote(100L);

        assertEquals(10L, resultado.getVotosTotais());
        assertEquals(7L, resultado.getVotosFavoraveis());
        verify(repository, times(1)).countVote(100L);
    }

    @Test
    @DisplayName("Deve salvar voto com sucesso quando ainda não votou")
    void salvarVoto_QuandoNaoVotouAinda() {
        when(repository.verifyVote(1L, 100L)).thenReturn(false);

        service.save(voto);

        verify(repository, times(1)).verifyVote(1L, 100L);
        verify(repository, times(1)).save(voto);
    }

    @Test
    @DisplayName("Deve lançar exceção ao tentar votar novamente")
    void salvarVoto_QuandoJaVotou_DeveLancarExcecao() {
        when(repository.verifyVote(1L, 100L)).thenReturn(true);

        BusinessException ex = assertThrows(BusinessException.class, () -> service.save(voto));

        assertEquals("Este Cooperado já contabilizou seu Voto para essa Votação.", ex.getMessage());
        verify(repository, times(1)).verifyVote(1L, 100L);
        verify(repository, never()).save(any());
    }

    //</editor-fold>

}
