package com.votacao.api.dto.pauta;

import com.votacao.domain.entity.Pauta;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;

@Mapper(componentModel = SPRING)
public interface PautaMapper {

    @Mappings(value = {
            @Mapping(target = "dataAtualizacao", ignore = true),
            @Mapping(target = "dataCriacao", ignore = true)
    })
    Pauta toEntity(PautaRequest request);

    PautaResponse toResponse(Pauta entity);

    List<PautaResponse> toResponse(List<Pauta> entity);

}
