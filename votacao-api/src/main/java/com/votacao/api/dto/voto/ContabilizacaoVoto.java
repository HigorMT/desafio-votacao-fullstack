package com.votacao.api.dto.voto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ContabilizacaoVoto {

    private Long votosDesfavoraveis;
    private Long votosFavoraveis;
    private Long votosTotais;

}
