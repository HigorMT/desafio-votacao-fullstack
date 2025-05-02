import {CircularProgress} from '@mui/material';
import React, {useEffect} from 'react';

export interface DefaultContentProps {
    children?: React.ReactNode,
    loading?: boolean
    height?: string
    width?: string
}

export const DefaultContent = ({children, loading = false, height = '100%', width = '100%'}: DefaultContentProps) => {

    useEffect((): void => {

    }, [loading]);

    return (
        <>
            {loading ?
                (
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: width, height: height, overflow: 'hidden'}}>
                        <CircularProgress/>
                    </div>
                )
                :
                (
                    <>
                        {children}
                    </>
                )
            }
        </>
    );
};
