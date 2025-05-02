package com.votacao.api.controller;

import com.votacao.api.dto.pauta.PautaMapper;
import com.votacao.api.dto.pauta.PautaRequest;
import com.votacao.api.dto.pauta.PautaResponse;
import com.votacao.domain.entity.Pauta;
import com.votacao.domain.service.PautaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
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
@RequestMapping("/pauta")
public class PautaController {

    private final PautaService service;
    private final PautaMapper mapper;

    @PostMapping
    public ResponseEntity<PautaResponse> save(@Valid @RequestBody PautaRequest request) {
        Pauta entity = mapper.toEntity(request);
        Pauta savedEntity = service.save(entity);
        return ResponseEntity.ok(mapper.toResponse(savedEntity));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PautaResponse> update(@PathVariable("id") Long id, @Valid @RequestBody PautaRequest request) {
        Pauta entity = mapper.toEntity(request);
        Pauta savedEntity = service.update(entity, id);
        return ResponseEntity.ok(mapper.toResponse(savedEntity));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PautaResponse> update(@PathVariable("id") Long id) {
        Pauta entity = service.findById(id);
        return ResponseEntity.ok(mapper.toResponse(entity));
    }

    @GetMapping("/pageable")
    public ResponseEntity<Page<PautaResponse>> pageable(@PageableDefault(sort = "id", direction = DESC) Pageable pageable) {
        Page<Pauta> pageEntity = service.pageable(pageable);

        List<PautaResponse> responses = mapper.toResponse(pageEntity.getContent());
        Page<PautaResponse> pageResponse = new PageImpl<>(responses, pageable, pageEntity.getTotalElements());

        return ResponseEntity.ok(pageResponse);
    }

}
