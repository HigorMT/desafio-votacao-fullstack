package com.votacao.domain.service;

import com.votacao.api.dto.cooperado.ValidacaoCooperadoVoto;
import com.votacao.domain.entity.Cooperado;
import com.votacao.domain.exception.BusinessException;
import com.votacao.domain.exception.DataNotFoundException;
import com.votacao.domain.facade.CooperadoFacade;
import com.votacao.domain.facade.ForDevFacade;
import com.votacao.domain.repository.CooperadoRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

import static io.micrometer.common.util.StringUtils.isEmpty;
import static java.lang.String.format;
import static java.util.Objects.isNull;

@Service
@RequiredArgsConstructor
public class CooperadoService {

    private final CooperadoRepository repository;
    private final ForDevFacade forDevFacade;
    private final CooperadoFacade facade;

    public Cooperado findById(Long id) {
        return repository.findById(id).orElseThrow(() -> new DataNotFoundException(format("Cooperado com ID %d não encontrado.", id)));
    }

    public Cooperado findByCpf(String cpf) {
        return findByCpfOpt(cpf).orElseThrow(() -> new DataNotFoundException(format("Cooperado com CPF %s não encontrado.", cpf)));
    }

    public Optional<Cooperado> findByCpfOpt(String cpf) {
        return repository.findByCpf(cpf);
    }

    public Cooperado save(Cooperado entity) {
        validation(entity);
        return repository.save(entity);
    }

    private void validation(Cooperado entity) {
        if (isNull(entity.getCpf()) || isEmpty(entity.getCpf())) {
            throw new BusinessException("O CPF do Cooperado deve ser informado.");
        }

        if (isNull(entity.getNome()) || isEmpty(entity.getNome())) {
            throw new BusinessException("O Nome do Cooperado deve ser informado.");
        }
    }

    @Transactional
    public Cooperado findOrGenerate(String cpf) {
        Cooperado cooperado = findByCpfOpt(cpf).orElse(forDevFacade.generatePerson(cpf));

        if (isNull(cooperado.getId())) {
            return save(cooperado);
        }

        return cooperado;
    }

    public ValidacaoCooperadoVoto validateToVote(String cpf) {
        Boolean cpfValido = facade.verificaDigitosVerificadoresCPF(cpf);

        if (!cpfValido) {
            throw new DataNotFoundException("CPF inválido.");
        }

        return ValidacaoCooperadoVoto.builder()
                .status(facade.validateToVote())
                .build();
    }

}
