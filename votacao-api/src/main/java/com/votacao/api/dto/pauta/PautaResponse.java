package com.votacao.api.dto.pauta;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.votacao.domain.enums.StatusPautaEnum;
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
public class PautaResponse {

    private Long id;
    private String nome;
    private String duracao;
    private String descricao;
    private StatusPautaEnum status;

    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    private LocalDateTime dataCriacao;

    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    private LocalDateTime dataAtualizacao;

}
