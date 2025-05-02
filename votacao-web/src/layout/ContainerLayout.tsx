import {Box, Grid} from '@mui/material';
import React, {useMemo} from 'react';

interface BoxContainerLayoutProps {
    children: React.ReactNode;
    maxWidth?: string;
}

export const ContainerLayout = ({children, maxWidth}: BoxContainerLayoutProps) => {

    const width: string = useMemo((): string => {
        return maxWidth || 'calc(100vw - 30%)'
    }, [maxWidth]);
    
    return (
        <Box >
            <Grid sx={{width: width, maxWidth: width, margin: 'auto'}}
                  style={{padding: '20px' }}
                  justifyContent="center"
                  container>
                {children}
            </Grid>
        </Box>
    );
};
