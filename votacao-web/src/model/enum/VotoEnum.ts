import {OptionItem} from '../OptionItem';

export enum VotoEnum {
    SIM = 'SIM',
    NAO = 'NAO',
}

export namespace VotoEnum {

    export const mapDescricao: Map<VotoEnum, string> = new Map([
        [VotoEnum.SIM, 'Sim' ],
        [VotoEnum.NAO, 'Não' ],
    ]);

    export function getDescricao(key: VotoEnum): string {
        return mapDescricao.get(key) || '';
    }

    export function getOptions(): OptionItem<VotoEnum>[] {
        return Array.from(mapDescricao.entries()).map(
            ([value, label]: [VotoEnum, string]): OptionItem<VotoEnum> => ({
                label,
                value,
            })
        );
    }

}
