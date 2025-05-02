package com.votacao.infrastruct.feign;

import com.votacao.api.dto.fordevs.PessoaResponse;
import com.votacao.core.config.FeignConfiguration;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Map;

@FeignClient(
        name = "geradorPessoaClient",
        url = "https://www.4devs.com.br",
        configuration = FeignConfiguration.class
)
public interface Feign4Dev {

    @PostMapping(value = "/ferramentas_online.php", consumes = "application/x-www-form-urlencoded")
    List<PessoaResponse> gerarPessoa(@RequestBody Map<String, ?> formData);

}
