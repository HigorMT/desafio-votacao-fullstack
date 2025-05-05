package com.votacao.api.dto.votacao;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.votacao.domain.entity.Pauta;
import com.votacao.domain.enums.StatusVotacaoEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VotacaoResponse {

    private Long id;
    private Pauta pauta;
    private Long duracaoSegundos;
    private String duracaoVotacao;
    private StatusVotacaoEnum status;

    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    private LocalDateTime dataCriacao;

    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    private LocalDateTime dataAtualizacao;

    private LocalDateTime dataInicio;

    private LocalDateTime dataFim;

}
