import {Box, Grid} from '@mui/material';
import React from 'react';

interface BoxContainerLayoutProps {
    children: React.ReactNode;
    maxWidth?: string;
}

export const ContainerLayout = ({children, maxWidth}: BoxContainerLayoutProps): React.JSX.Element => {

    return (
        <Box>
            <Grid sx={{width: maxWidth, maxWidth: maxWidth, margin: 'auto'}}
                  style={{padding: '20px'}}
                  justifyContent="center"
                  container>
                {children}
            </Grid>
        </Box>
    );
};
