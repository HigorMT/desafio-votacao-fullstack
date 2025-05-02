package com.votacao.domain.service;

import com.votacao.api.dto.voto.ContabilizacaoVoto;
import com.votacao.domain.entity.Voto;
import com.votacao.domain.exception.BusinessException;
import com.votacao.domain.repository.VotoRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class VotoService {

    private final VotoRepository repository;

    public ContabilizacaoVoto countVote(Long votacaoId) {
        return repository.countVote(votacaoId);
    }

    @Transactional
    public void save(Voto entity) {
        boolean verifyVote = repository.verifyVote(entity.getId().getCooperadoId(), entity.getId().getVotacaoId());

        if (verifyVote) {
            throw new BusinessException("Este Cooperado já contabilizou seu Voto para essa Votação.");
        }

        repository.save(entity);
    }

}
