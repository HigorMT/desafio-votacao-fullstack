import {OptionItem} from '../OptionItem';

export enum StatusVotacaoEnum {
    AGUARDANDO_INICIO = 'AGUARDANDO_INICIO',
    EM_VOTACAO = 'EM_VOTACAO',
    ENCERRADA = 'ENCERRADA',
    CANCELADA = 'CANCELADA'
}

export namespace StatusVotacaoEnum {

    export const mapDescricao: Map<StatusVotacaoEnum, string> = new Map([
        [StatusVotacaoEnum.AGUARDANDO_INICIO,  'Aguardando Inicio' ],
        [StatusVotacaoEnum.EM_VOTACAO,         'Em Votação'        ],
        [StatusVotacaoEnum.ENCERRADA,          'Encerrada'         ],
        [StatusVotacaoEnum.CANCELADA,          'Cancelada'         ],
    ]);

    export function getDescricao(key: StatusVotacaoEnum): string {
        return mapDescricao.get(key) || '';
    }

    export function getOptions(): OptionItem<StatusVotacaoEnum>[] {
        return Array.from(mapDescricao.entries()).map(
            ([value, label]: [StatusVotacaoEnum, string]): OptionItem<StatusVotacaoEnum> => ({
                label,
                value,
            })
        );
    }

}
