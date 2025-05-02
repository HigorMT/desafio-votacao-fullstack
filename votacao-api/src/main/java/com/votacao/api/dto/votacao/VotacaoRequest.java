package com.votacao.api.dto.votacao;

import com.votacao.api.dto.common.ObjectId;
import com.votacao.domain.enums.StatusVotacaoEnum;
import jakarta.validation.constraints.NotBlank;
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
public class VotacaoRequest {

    private Long id;

    @NotNull(message = "A Pauta vinculada deve ser informada.")
    private ObjectId pauta;

    @NotNull(message = "O campo Duração deve ser informado.")
    @NotBlank(message = "O campo Duração deve ser informado.")
    private String duracaoVotacao;

    @NotNull(message = "O campo Status deve ser informado.")
    private StatusVotacaoEnum status;

}
