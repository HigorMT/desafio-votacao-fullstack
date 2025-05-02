package com.votacao.api.dto.pauta;


import com.votacao.domain.enums.StatusPautaEnum;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
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
public class PautaRequest {

    private Long id;

    @NotNull(message = "O campo Nome deve ser informado.")
    @NotBlank(message = "O campo Nome deve ser informado.")
    @Size(max = 100, message = "O campo Nome deve ter no máximo {max} caracteres")
    private String nome;

    @NotNull(message = "O campo Duração deve ser informado.")
    @NotBlank(message = "O campo Duração deve ser informado.")
    @Pattern( regexp = "\\d{1,5}:\\d{2}:\\d{2}", message = "O campo Duração deve estar no formato HH:mm:ss, com horas de 1 a 5 dígitos e minutos/segundos entre 00 e 59")
    private String duracao;

    @NotNull(message = "O campo Descrição deve ser informado.")
    @NotBlank(message = "O campo Descrição deve ser informado.")
    @Size(max = 500, message = "O campo Descrição deve ter no máximo {max} caracteres")
    private String descricao;

    @NotNull(message = "O campo Status deve ser informado.")
    private StatusPautaEnum status;

}
