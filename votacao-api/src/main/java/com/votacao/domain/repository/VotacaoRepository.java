package com.votacao.domain.repository;

import com.votacao.domain.entity.Votacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface VotacaoRepository extends JpaRepository<Votacao, Long> {

    @Query("SELECT (CASE WHEN( COUNT(v.id) > 0 ) THEN TRUE ELSE FALSE END ) FROM Votacao v " +
            "   JOIN v.pauta p" +
            "  WHERE (:votacaoId IS NULL OR v.id <> :votacaoId) " +
            "    AND (p.id = :pautaId) ")
    boolean votacaoDuplicada(Long pautaId, Long votacaoId);

}