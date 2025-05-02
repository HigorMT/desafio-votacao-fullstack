package com.votacao.domain.repository;

import com.votacao.domain.entity.Pauta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PautaRepository extends JpaRepository<Pauta, Long> {
}