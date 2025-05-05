import {useEffect, useState} from 'react';

interface UseVotacaoTimerProps {
    dataInicio?: Date;
    duracaoSegundos?: number;
}

export const useVotacaoTimer = (
    { dataInicio, duracaoSegundos }: UseVotacaoTimerProps,
    trigger: any
) => {
    const [tempoRestante, setTempoRestante] = useState<number | null>(null);

    useEffect((): void => {
        if (!dataInicio || !duracaoSegundos) {
            setTempoRestante(null);
            return;
        }

        const inicio: number = new Date(dataInicio).getTime();
        const fim: number = inicio + duracaoSegundos * 1000;

        const agora: number = Date.now();
        const restante: number = Math.max(Math.floor((fim - agora) / 1000), 0);

        setTempoRestante(restante);
    }, [dataInicio, duracaoSegundos, trigger]);

    return { tempoRestante };
};
