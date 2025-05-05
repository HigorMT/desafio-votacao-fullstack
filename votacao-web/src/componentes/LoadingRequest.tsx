import {DefaultDialog} from './DefaultDialog';
import {CircularProgress} from '@mui/material';
import React, {useEffect} from 'react';

interface LoadingRequestProps {
    loading?: boolean
}

export const LoadingRequest = ({loading = false}: LoadingRequestProps): React.JSX.Element => {

    useEffect((): void => {

    }, [loading]);

    return (
        <DefaultDialog message={'Realizando requisição...'}
                       title={'Carregando'}
                       open={loading}>
            <CircularProgress size={50}/>
        </DefaultDialog>
    );
};
