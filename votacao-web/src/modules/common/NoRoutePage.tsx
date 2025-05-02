import React from 'react';
import {Box, Button, Grid, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {Routes} from '../../router/route-constants';

export const NoRoutePage = (): React.JSX.Element => {

    const navigate = useNavigate();

    return (
        <Box
            sx={{
                height:             '100vh',
                backgroundImage:    'url(https://static.vecteezy.com/ti/vetor-gratis/p1/20272064-psd-404-pagina-nao-encontrado-erro-3d-renderizacao-icone-ilustracao-vetor.jpg)',
                backgroundSize:     'cover',
                backgroundPosition: 'center',
                display:            'flex',
                justifyContent:     'center',
                alignItems:         'center',
                color:              'white',
                textShadow:         '2px 2px 4px rgba(0,0,0,0.7)',
                textAlign:          'center',
                p:                  2,
            }}
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h4" component="h1">
                        Ooops, parece que acessou uma rota inexistente.
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        onClick={(): void => navigate(`${Routes.HOME.path}`)}
                        color={'primary'} autoFocus
                        variant={'contained'}
                    >
                        Home
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};
