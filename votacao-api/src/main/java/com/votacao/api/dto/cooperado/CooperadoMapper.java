package com.votacao.api.dto.cooperado;

import com.votacao.domain.entity.Cooperado;
import org.mapstruct.Mapper;

import java.util.List;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;

@Mapper(componentModel = SPRING)
public interface CooperadoMapper {

    Cooperado toEntity(CooperadoRequest request);

    CooperadoResponse toResponse(Cooperado entity);

    List<CooperadoResponse> toResponse(List<Cooperado> entity);

}
