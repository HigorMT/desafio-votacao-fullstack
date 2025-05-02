package com.votacao.api.controller;

import com.votacao.api.dto.cooperado.CooperadoMapper;
import com.votacao.api.dto.cooperado.CooperadoResponse;
import com.votacao.api.dto.cooperado.ValidacaoCooperadoVoto;
import com.votacao.domain.entity.Cooperado;
import com.votacao.domain.service.CooperadoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/cooperado")
public class CooperadoController {

    private final CooperadoService service;
    private final CooperadoMapper mapper;

    @GetMapping("/validate-vote")
    public ResponseEntity<ValidacaoCooperadoVoto> validateToVote(@RequestParam String cpf) {
        return ResponseEntity.ok(service.validateToVote(cpf));
    }

    @GetMapping("/cpf")
    public ResponseEntity<CooperadoResponse> findOrGeneratebCpf(@RequestParam String cpf) {
        Cooperado entity = service.findOrGenerate(cpf);
        CooperadoResponse response = mapper.toResponse(entity);
        return ResponseEntity.ok(response);
    }

}
