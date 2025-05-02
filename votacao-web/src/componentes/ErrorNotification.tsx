import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Button} from '@mui/material';
import {DefaultDialog} from './DefaultDialog';
import {Cached, HighlightOff} from '@mui/icons-material';

interface ErrorNotificationProps {
    onClose?: () => void;
    error?: any;
}

export const ErrorNotification = ({error, onClose}: ErrorNotificationProps): React.JSX.Element => {

    //region Constants
    const [erro, setErro] = useState<string>('');
    //endregion

    //region Hooks
    const handleError = useCallback((err: any): void => {
        if (err !== undefined && Object.keys(err).length > 0) {
            if (err?.response?.data?.detail && err?.response?.data?.detail?.length > 0) {
                const details: string = err.response.data.detail
                let message: string = `Erros Encontrados: ${details}`;

                setErro(message)
            } else if (err?.response?.data?.message) {
                setErro(err?.response?.data?.message);
            } else {
                setErro('Falha na comunicação com o servidor.');
            }
        } else {
            setErro('');
        }
    }, []);
    
    useEffect((): void => {
        handleError(error);
    }, [error, handleError]);
    
    const bottomBar: React.JSX.Element = useMemo((): React.JSX.Element => {
        return (
            <>
                <Button onClick={(): void => window.location.reload()}
                        startIcon={<Cached />}
                        variant={'contained'}
                        color={'error'}
                        autoFocus>
                    Recarregar
                </Button>

                <Button onClick={(): void => onClose?.()}
                        startIcon={<HighlightOff />}
                        variant={'contained'}
                        color={'warning'}
                        autoFocus>
                    Fechar
                </Button>
            </>
        );
    }, [onClose]);
    //endregion

    return (
        <DefaultDialog title={'Error'} message={erro} open={!!erro} bottomBar={bottomBar}/>
    );
};
