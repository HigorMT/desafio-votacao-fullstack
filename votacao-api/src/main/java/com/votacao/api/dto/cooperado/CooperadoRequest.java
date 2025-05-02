package com.votacao.api.dto.cooperado;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.br.CPF;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CooperadoRequest {

    private Long id;

    @NotNull(message = "O campo CPF deve ser informado.")
    @NotBlank(message = "O campo CPF deve ser informado.")
    @CPF(message = "O campo CPF deve ser informado no padrão 999.999.999-99")
    @Size(max = 14, message = "O campo CPF deve ter no máximo {max} caracteres")
    private String cpf;

    @NotNull(message = "O campo Nome deve ser informado.")
    @NotBlank(message = "O campo Nome deve ser informado.")
    @Size(max = 255, message = "O campo Nome deve ter no máximo {max} caracteres")
    private String nome;

}
