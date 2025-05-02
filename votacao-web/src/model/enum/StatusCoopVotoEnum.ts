import {OptionItem} from '../OptionItem';

export enum StatusCoopVotoEnum {

    ABLE_TO_VOTE = 'ABLE_TO_VOTE',
    UNABLE_TO_VOTE = 'UNABLE_TO_VOTE',

}

export namespace StatusCoopVotoEnum {

    export const mapDescricao: Map<StatusCoopVotoEnum, string> = new Map([
        [StatusCoopVotoEnum.ABLE_TO_VOTE,   'Pode votar'     ],
        [StatusCoopVotoEnum.UNABLE_TO_VOTE, 'Não pode votar' ],
    ]);

    export function getDescricao(key: StatusCoopVotoEnum): string {
        return mapDescricao.get(key) || '';
    }

    export function getOptions(): OptionItem<StatusCoopVotoEnum>[] {
        return Array.from(mapDescricao.entries()).map(
            ([value, label]: [StatusCoopVotoEnum, string]): OptionItem<StatusCoopVotoEnum> => ({
                label,
                value,
            })
        );
    }

}
