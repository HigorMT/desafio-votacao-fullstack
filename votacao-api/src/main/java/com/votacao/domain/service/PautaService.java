package com.votacao.domain.service;

import com.votacao.domain.entity.Pauta;
import com.votacao.domain.exception.BusinessException;
import com.votacao.domain.exception.DataNotFoundException;
import com.votacao.domain.repository.PautaRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import static com.votacao.domain.enums.StatusPautaEnum.NOVA;
import static java.lang.String.format;

@Service
@RequiredArgsConstructor
public class PautaService {

    private final PautaRepository repository;

    public Pauta findById(Long id) {
        return repository.findById(id).orElseThrow(() -> new DataNotFoundException(format("Pauta com ID %d não encontrada.", id)));
    }

    public Page<Pauta> pageable(Pageable page) {
        return repository.findAll(page);
    }

    @Transactional
    public Pauta save(Pauta entity) {
        return repository.save(entity);
    }

    @Transactional
    public Pauta update(Pauta entity, Long id) {
        Pauta dataBase = findById(id);

        if (!NOVA.equals(dataBase.getStatus())) {
            throw new BusinessException("Apenas Pautas com status 'Nova' podem sofrer alterações.");
        }

        return repository.save(entity);
    }

}
