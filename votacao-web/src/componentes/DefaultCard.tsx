import {Grid} from '@mui/material';
import Typography from '@mui/material/Typography';
import React from 'react';
import Card from '@mui/material/Card';

export interface DefaultCardProps {
    style?: React.CSSProperties
    children?: React.ReactNode
    subTitle?: string
    title?: string
}

export const DefaultCard = ({title, children, subTitle, style}: DefaultCardProps): React.JSX.Element => {
    return (
        <Card sx={{padding: '1.2rem 1.2rem', my: 2}} style={{...style}}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                    {title &&
                        (
                            <Typography variant="h5" gutterBottom>
                                {title}
                            </Typography>
                        )
                    }

                    {subTitle &&
                        (
                            <Typography variant="subtitle1" gutterBottom align="center">
                                {subTitle}
                            </Typography>
                        )
                    }

                </Grid>

                {children}

            </Grid>
        </Card>
    );
};
