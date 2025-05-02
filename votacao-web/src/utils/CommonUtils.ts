import {ConditionError} from '../model/ConditionError';

export const defaultMessageFieldError = 'O campo deve ser informado'

export const cpfPattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
export const isCpfValid = (cpf: string): boolean => cpfPattern.test(cpf);

export const hasValue = (value?: string): boolean => !!value && value !== "";

export const hasErrors = (errorObject: { [s: string]: unknown; } | ArrayLike<unknown>): boolean => Object.entries(errorObject).some(([key, value]): boolean => !!value);

export const generateErrorFields = (fields: ConditionError[], old: any): Record<string, string> =>
    fields.reduce(
        (acc, { key, condition }: ConditionError): any => {
            acc[key || ''] = condition ? defaultMessageFieldError : '';
            return acc;
        },
        { ...old }
    );


