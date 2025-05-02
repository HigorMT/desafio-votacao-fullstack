package com.votacao.domain.repository;

import com.votacao.domain.entity.Cooperado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CooperadoRepository extends JpaRepository<Cooperado, Long> {

    @Query("FROM Cooperado c WHERE c.cpf = :cpf")
    Optional<Cooperado> findByCpf(String cpf);

}