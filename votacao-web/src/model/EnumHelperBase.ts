import {OptionItem} from './OptionItem';

export abstract class EnumHelperBase<T> {
    protected abstract mapDescricao: Map<T, string>;

    getDescricao(key: T): string {
        return this.mapDescricao.get(key) || '';
    }

    getOptions(): OptionItem<T>[] {
        return Array.from(this.mapDescricao.entries()).map(([value, label]) => ({
            value,
            label,
        }));
    }
}
