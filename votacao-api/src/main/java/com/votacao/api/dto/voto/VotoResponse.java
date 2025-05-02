package com.votacao.api.dto.voto;

import com.votacao.domain.enums.VotoEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VotoResponse {

    private VotoIdRequest id;
    private VotoEnum decisao;

}
