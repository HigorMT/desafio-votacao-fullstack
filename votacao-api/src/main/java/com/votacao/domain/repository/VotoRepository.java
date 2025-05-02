package com.votacao.domain.repository;

import com.votacao.api.dto.voto.ContabilizacaoVoto;
import com.votacao.domain.entity.Voto;
import com.votacao.domain.entity.VotoId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface VotoRepository extends JpaRepository<Voto, VotoId> {

    @Query("SELECT NEW com.votacao.api.dto.voto.ContabilizacaoVoto( " +
            "      COUNT(v.id) FILTER (WHERE v.decisao = com.votacao.domain.enums.VotoEnum.NAO)," +
            "      COUNT(v.id) FILTER (WHERE v.decisao = com.votacao.domain.enums.VotoEnum.SIM)," +
            "      COUNT(v.id)" +
            " ) FROM Voto v" +
            "  WHERE v.id.votacaoId = :votacaoId")
    ContabilizacaoVoto countVote(Long votacaoId);

    @Query("SELECT (CASE WHEN( COUNT(v.id) > 0 ) THEN TRUE ELSE FALSE END ) FROM Voto v " +
            "  WHERE (v.id.cooperadoId = :cooperadoId ) " +
            "    AND (v.id.votacaoId   = :votacaoId   ) ")
    boolean verifyVote(Long cooperadoId, Long votacaoId);


}