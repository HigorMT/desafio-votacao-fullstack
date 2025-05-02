package com.votacao.api.dto.voto;

import com.votacao.domain.entity.Voto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;

@Mapper(componentModel = SPRING)
public interface VotoMapper {

    @Mappings(value = {
            @Mapping(target = "id", source = "id"),
    })
    Voto toEntity(VotoRequest request);

    @Mappings(value = {
            @Mapping(target = "id", source = "id"),
    })
    VotoResponse toResponse(Voto entity);

    List<VotoResponse> toResponse(List<Voto> entity);

}
