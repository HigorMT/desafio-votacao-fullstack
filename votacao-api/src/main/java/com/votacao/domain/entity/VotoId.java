package com.votacao.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class VotoId implements Serializable {

    @Column(name = "cooperado_id")
    private Long cooperadoId;

    @Column(name = "votacao_id")
    private Long votacaoId;

}
