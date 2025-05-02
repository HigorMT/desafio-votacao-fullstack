package com.votacao.api.dto.fordevs;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class PessoaResponse {

    private String nome;
    private String cpf;
    private String sexo;
    private String email;

    @JsonProperty("data_nasc")
    private String dataNascimento;

}
