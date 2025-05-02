export class SelectorProps<T> {
    onChange?: (value: T) => void;
    placeHolder?: string;
    error?: string = '';
    required?: boolean;
    disabled?: boolean;
    label?: string;
    value?: T;
}
