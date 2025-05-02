package com.votacao.api.dto.cooperado;

import com.votacao.domain.enums.StatusCoopVotoEnum;
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
public class ValidacaoCooperadoVoto {

    private StatusCoopVotoEnum status;

}
