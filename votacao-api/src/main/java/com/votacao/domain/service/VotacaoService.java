package com.votacao.domain.service;

import com.votacao.api.dto.voto.ContabilizacaoVoto;
import com.votacao.domain.entity.Pauta;
import com.votacao.domain.entity.Votacao;
import com.votacao.domain.enums.StatusPautaEnum;
import com.votacao.domain.exception.BusinessException;
import com.votacao.domain.exception.DataNotFoundException;
import com.votacao.domain.repository.VotacaoRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

import static com.votacao.domain.enums.StatusPautaEnum.APROVADA;
import static com.votacao.domain.enums.StatusPautaEnum.REJEITADA;
import static com.votacao.domain.enums.StatusVotacaoEnum.AGUARDANDO_INICIO;
import static com.votacao.domain.enums.StatusVotacaoEnum.CANCELADA;
import static com.votacao.domain.enums.StatusVotacaoEnum.EM_VOTACAO;
import static com.votacao.domain.enums.StatusVotacaoEnum.ENCERRADA;
import static java.lang.String.format;
import static java.util.Objects.isNull;

@Service
@RequiredArgsConstructor
public class VotacaoService {

    private final VotacaoRepository repository;
    private final PautaService pautaService;
    private final VotoService votoService;

    public Votacao findById(Long id) {
        return repository.findById(id).orElseThrow(() -> new DataNotFoundException(format("Votação com ID %d não encontrado.", id)));
    }

    public Votacao save(Votacao entity) {
        validation(entity);
        return repository.save(entity);
    }

    private void validation(Votacao entity) {
        if (isNull(entity.getPauta()) || isNull(entity.getPauta().getId())) {
            throw new BusinessException("A Votação deve estar vinculada a uma Pauta.");
        }

        Pauta pautaVinculada = pautaService.findById(entity.getPauta().getId());

        boolean duplicado = repository.votacaoDuplicada(pautaVinculada.getId(), entity.getId());

        if (duplicado) {
            throw new BusinessException(format("Já existe uma Votação para essa Pauta %d", pautaVinculada.getId()));
        }

        entity.setPauta(pautaVinculada);
    }

    @Transactional
    public Votacao createVoting(Long pautaId) {
        Pauta pautaVinculada = pautaService.findById(pautaId);
        Votacao entity = Votacao.builder()
                .duracaoVotacao(pautaVinculada.getDuracao())
                .status(AGUARDANDO_INICIO)
                .pauta(pautaVinculada)
                .build();

        return save(entity);
    }

    @Transactional
    public Votacao startVoting(Long id) {
        Votacao dataBase = findById(id);

        if (!AGUARDANDO_INICIO.equals(dataBase.getStatus())) {
            throw new BusinessException("Somente Votações 'Aguardando Inicio' podem ser iniciadas.");
        }

        Pauta pautaVinculada = dataBase.getPauta();
        pautaVinculada.setStatus(StatusPautaEnum.EM_VOTACAO);
        pautaService.save(pautaVinculada);

        dataBase.setDataInicio(LocalDateTime.now());
        dataBase.setStatus(EM_VOTACAO);

        return save(dataBase);
    }

    @Transactional
    public Votacao endVoting(Long id) {
        Votacao dataBase = findById(id);

        if (!EM_VOTACAO.equals(dataBase.getStatus())) {
            throw new BusinessException("Somente Votações 'Em Votação' podem ser encerradas.");
        }

        dataBase.setDataFim(LocalDateTime.now());
        dataBase.setStatus(ENCERRADA);
        countVote(dataBase);

        return save(dataBase);
    }

    @Transactional
    public Votacao cancelVoting(Long id) {
        Votacao dataBase = findById(id);

        if (ENCERRADA.equals(dataBase.getStatus())) {
            throw new BusinessException("Essa Votação já foi encerrada e não pode ser mais Cancelada.");
        }

        if (CANCELADA.equals(dataBase.getStatus())) {
            throw new BusinessException("Votação já cancelada anteriormente.");
        }

        Pauta pautaVinculada = dataBase.getPauta();
        pautaVinculada.setStatus(StatusPautaEnum.CANCELADA);
        pautaService.save(pautaVinculada);

        dataBase.setStatus(ENCERRADA);

        return save(dataBase);
    }

    public void countVote(Votacao votacao) {
        ContabilizacaoVoto resultado = votoService.countVote(votacao.getId());
        Long votosTotais = resultado.getVotosTotais();

        if (votosTotais == 0) {
            throw new BusinessException("Não é possível calcular o percentual com zero votos.");
        }

        double percentualFavoravel = (resultado.getVotosFavoraveis() * 100.0) / votosTotais;

        Pauta pauta = votacao.getPauta();
        pauta.setStatus(percentualFavoravel > 51.0 ? APROVADA : REJEITADA);

        pautaService.save(pauta);
    }

    public Page<Votacao> pageable(Pageable pageable) {
        return repository.findAll(pageable);
    }

}
