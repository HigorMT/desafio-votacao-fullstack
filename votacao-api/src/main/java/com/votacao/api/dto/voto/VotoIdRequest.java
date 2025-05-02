package com.votacao.api.dto.voto;

import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class VotoIdRequest {

    @NotNull(message = "O Cooperado deve ser informado.")
    private Long cooperadoId;

    @NotNull(message = "A Votação deve ser informada.")
    private Long votacaoId;

}
