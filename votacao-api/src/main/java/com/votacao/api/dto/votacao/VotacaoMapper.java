package com.votacao.api.dto.votacao;

import com.votacao.api.dto.pauta.PautaMapper;
import com.votacao.domain.entity.Votacao;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;

@Mapper(componentModel = SPRING, uses = {PautaMapper.class})
public interface VotacaoMapper {


    @Mappings(value = {
            @Mapping(target = "dataAtualizacao", ignore = true),
            @Mapping(target = "dataCriacao", ignore = true),
            @Mapping(target = "dataInicio", ignore = true),
            @Mapping(target = "pauta", source = "pauta"),
            @Mapping(target = "dataFim", ignore = true),
    })
    Votacao toEntity(VotacaoRequest request);

    VotacaoResponse toResponse(Votacao entity);

    List<VotacaoResponse> toResponse(List<Votacao> entity);

}
