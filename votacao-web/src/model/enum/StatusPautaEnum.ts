import {OptionItem} from '../OptionItem';

export enum StatusPautaEnum {

    NOVA = 'NOVA',
    APROVADA = 'APROVADA',
    REJEITADA = 'REJEITADA',
    CANCELADA = 'CANCELADA',
    EM_VOTACAO = 'EM_VOTACAO',

}

export namespace StatusPautaEnum {

    export const mapDescricao: Map<StatusPautaEnum, string> = new Map([
        [StatusPautaEnum.NOVA,       'Nova'       ],
        [StatusPautaEnum.APROVADA,   'Aprovada'   ],
        [StatusPautaEnum.REJEITADA,  'Rejeitada'  ],
        [StatusPautaEnum.CANCELADA,  'Cancelada'  ],
        [StatusPautaEnum.EM_VOTACAO, 'Em Votação' ],
    ]);

    export function getDescricao(key: StatusPautaEnum): string {
        return mapDescricao.get(key) || '';
    }

    export function getOptions(): OptionItem<StatusPautaEnum>[] {
        return Array.from(mapDescricao.entries()).map(
            ([value, label]: [StatusPautaEnum, string]): OptionItem<StatusPautaEnum> => ({
                label,
                value,
            })
        );
    }

}
