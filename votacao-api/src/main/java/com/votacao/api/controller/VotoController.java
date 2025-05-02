package com.votacao.api.controller;

import com.votacao.api.dto.voto.ContabilizacaoVoto;
import com.votacao.api.dto.voto.VotoMapper;
import com.votacao.api.dto.voto.VotoRequest;
import com.votacao.domain.entity.Voto;
import com.votacao.domain.service.VotoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/votacao/voto")
public class VotoController {

    private final VotoService service;
    private final VotoMapper mapper;

    @PostMapping
    public ResponseEntity<Void> vote(@Valid @RequestBody VotoRequest request) {
        Voto entity = mapper.toEntity(request);

        service.save(entity);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/{votacaoId}/counting")
    public ResponseEntity<ContabilizacaoVoto> counting(@PathVariable("votacaoId") Long votacaoId) {
        ContabilizacaoVoto counting = service.countVote(votacaoId);

        return ResponseEntity.ok(counting);
    }

}
