package com.votacao.api.dto.cooperado;

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
public class CooperadoResponse {

    private Long id;
    private String cpf;
    private String nome;

}
