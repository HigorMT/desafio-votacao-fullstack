package com.votacao.api.dto.voto;

import com.votacao.domain.enums.VotoEnum;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
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
public class VotoRequest {

    @Valid
    @NotNull(message = "As Informações referênte ao Cooperado e Votação devem ser informadas.")
    private VotoIdRequest id;

    @NotNull(message = "A Decisão deve ser informada.")
    private VotoEnum decisao;

}
