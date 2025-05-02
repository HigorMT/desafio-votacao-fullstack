import React from 'react';
import {IMaskInput} from 'react-imask';

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

export const MascaraCPF = React.forwardRef<HTMLInputElement, CustomProps>(
    function TextMaskCustom(props, ref) {
        const { onChange, ...other } = props;
        return (
            <IMaskInput
                {...other}
                mask="000.000.000-00"
                definitions={{
                    '#': /[1-9]/,
                }}
                inputRef={ref}
                onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
                overwrite
            />
        );
    },
);


export function verificaDigitosVerificadoresCPF(cpf: any) {
    cpf = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cpf.length !== 11) return false;


    if (/^(\d)\1+$/.test(cpf)) return false;

    let soma;
    let resto;

    soma = 0;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;


    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;

    return true;
}
