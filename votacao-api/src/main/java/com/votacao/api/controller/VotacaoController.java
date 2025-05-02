package com.votacao.api.controller;

import com.votacao.api.dto.votacao.VotacaoMapper;
import com.votacao.api.dto.votacao.VotacaoRequest;
import com.votacao.api.dto.votacao.VotacaoResponse;
import com.votacao.domain.entity.Votacao;
import com.votacao.domain.service.VotacaoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.data.domain.Sort.Direction.DESC;

@RestController
@RequiredArgsConstructor
@RequestMapping("/votacao")
public class VotacaoController {

    private final VotacaoService service;
    private final VotacaoMapper mapper;

    @PostMapping
    public ResponseEntity<VotacaoResponse> save(@Valid @RequestBody VotacaoRequest request) {
        Votacao entity = mapper.toEntity(request);
        Votacao savedEntity = service.save(entity);
        return ResponseEntity.ok(mapper.toResponse(savedEntity));
    }

    @PutMapping("/{pautaId}/create-voting")
    public ResponseEntity<VotacaoResponse> createVoting(@PathVariable("pautaId") Long pautaId) {
        Votacao savedEntity = service.createVoting(pautaId);
        return ResponseEntity.ok(mapper.toResponse(savedEntity));
    }

    @PutMapping("/{id}/start-voting")
    public ResponseEntity<VotacaoResponse> startVoting(@PathVariable("id") Long id) {
        Votacao savedEntity = service.startVoting(id);
        return ResponseEntity.ok(mapper.toResponse(savedEntity));
    }

    @PutMapping("/{id}/end-voting")
    public ResponseEntity<VotacaoResponse> endVoting(@PathVariable("id") Long id) {
        Votacao savedEntity = service.endVoting(id);
        return ResponseEntity.ok(mapper.toResponse(savedEntity));
    }

    @PutMapping("/{id}/cancel-voting")
    public ResponseEntity<VotacaoResponse> cancelVoting(@PathVariable("id") Long id) {
        Votacao savedEntity = service.cancelVoting(id);
        return ResponseEntity.ok(mapper.toResponse(savedEntity));
    }

    @GetMapping("/{id}")
    public ResponseEntity<VotacaoResponse> findById(@PathVariable("id") Long id) {
        Votacao entity = service.findById(id);
        return ResponseEntity.ok(mapper.toResponse(entity));
    }

    @GetMapping("/pageable")
    public ResponseEntity<Page<VotacaoResponse>> pageable(@PageableDefault(sort = "id", direction = DESC) Pageable pageable) {
        Page<Votacao> pageEntity = service.pageable(pageable);

        List<VotacaoResponse> responses = mapper.toResponse(pageEntity.getContent());
        Page<VotacaoResponse> pageResponse = new PageImpl<>(responses, pageable, pageEntity.getTotalElements());

        return ResponseEntity.ok(pageResponse);
    }

}
