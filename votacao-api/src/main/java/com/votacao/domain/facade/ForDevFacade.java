package com.votacao.domain.facade;

import com.votacao.api.dto.fordevs.PessoaResponse;
import com.votacao.domain.entity.Cooperado;
import com.votacao.domain.exception.FeignException;
import com.votacao.infrastruct.feign.Feign4Dev;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static java.util.Objects.isNull;

@Service
@RequiredArgsConstructor
public class ForDevFacade {

    private final Feign4Dev feign4Dev;

    public Cooperado generatePerson(String cpf) {
        try {
            Map<String, Object> formData = new HashMap<>();
            formData.put("acao", "gerar_pessoa");
            formData.put("pontuacao", "S");
            formData.put("txt_qtde", "1");
            formData.put("sexo", "I");

            List<PessoaResponse> responses = feign4Dev.gerarPessoa(formData);

            if (isNull(responses) || responses.isEmpty()) {
                throw new FeignException("Erro na resposta da requisição");
            }

            PessoaResponse response = responses.get(0);

            return Cooperado.builder()
                    .nome(response.getNome())
                    .cpf(cpf)
                    .build();
        } catch (Exception ex) {
            throw new FeignException("Falha na Comunicação com a API 4Devs.", ex);
        }
    }

}
