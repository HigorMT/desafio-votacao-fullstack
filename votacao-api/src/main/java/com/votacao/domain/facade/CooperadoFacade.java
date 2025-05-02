package com.votacao.domain.facade;

import com.votacao.domain.enums.StatusCoopVotoEnum;
import org.springframework.stereotype.Component;

import java.util.concurrent.ThreadLocalRandom;

import static com.votacao.domain.enums.StatusCoopVotoEnum.ABLE_TO_VOTE;
import static com.votacao.domain.enums.StatusCoopVotoEnum.UNABLE_TO_VOTE;

@Component
public class CooperadoFacade {

    public StatusCoopVotoEnum validateToVote() {
        boolean ableVote = ThreadLocalRandom.current().nextBoolean();

        return (ableVote ? ABLE_TO_VOTE : UNABLE_TO_VOTE);
    }

    public boolean verificaDigitosVerificadoresCPF(String cpf) {
        if (cpf == null) return false;

        cpf = cpf.replaceAll("\\D", "");

        if (cpf.length() != 11) return false;

        if (cpf.matches("(\\d)\\1{10}")) return false;

        try {
            int soma = 0;
            int resto;

            for (int i = 0; i < 9; i++) {
                soma += Character.getNumericValue(cpf.charAt(i)) * (10 - i);
            }

            resto = (soma * 10) % 11;
            if (resto == 10 || resto == 11) resto = 0;
            if (resto != Character.getNumericValue(cpf.charAt(9))) return false;

            soma = 0;
            for (int i = 0; i < 10; i++) {
                soma += Character.getNumericValue(cpf.charAt(i)) * (11 - i);
            }

            resto = (soma * 10) % 11;
            if (resto == 10 || resto == 11) resto = 0;
            if (resto != Character.getNumericValue(cpf.charAt(10))) return false;

            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }

}
