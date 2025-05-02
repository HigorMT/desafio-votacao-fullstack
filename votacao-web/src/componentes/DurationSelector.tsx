import React, {useMemo, useState} from 'react';
import {TextField} from '@mui/material';
import {SelectorProps} from '../model/SelectorProps';


export const DurationSelector = ({
                                     placeHolder,
                                     onChange,
                                     required,
                                     disabled,
                                     label,
                                     value,
                                     error,
                                 }: SelectorProps<string>): React.JSX.Element => {
    const [invalid, setInvalid] = useState(false);

    const DURATION_REGEX = /^\d{1,5}:\d{2}:\d{2}$/;

    const formatDuration = (raw: string): string => {
        const digits = raw.replace(/\D/g, '').slice(0, 9); // Limita a 9 dígitos
        const padded = digits.padStart(6, '0'); // Garante pelo menos 6 dígitos (hhmmss)

        const ss: string = padded.slice(-2);
        const mm: string = padded.slice(-4, -2);
        const hh: string = padded.slice(0, -4) || '0';

        return `${parseInt(hh, 10)}:${mm}:${ss}`;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const formatted = formatDuration(e.target.value);
        const isValid = DURATION_REGEX.test(formatted);

        setInvalid(!isValid);
        onChange?.(formatted);
    };

    const _error: string = useMemo((): string => {
        return invalid
            ? 'Formato inválido. Use até 5 dígitos para horas (ex: 123:45:00).'
            : error || '';
    }, [error, invalid]);

    return (
        <TextField placeholder={placeHolder}
                   onChange={handleChange}
                   helperText={_error}
                   value={value || ''}
                   required={required}
                   disabled={disabled}
                   variant="outlined"
                   error={!!_error}
                   label={label}
                   fullWidth/>
    );
};
