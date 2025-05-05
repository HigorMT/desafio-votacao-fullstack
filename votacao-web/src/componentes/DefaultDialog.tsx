import {CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import React from 'react';
import {Theme, useMediaQuery} from '@mui/system';
import {ShowContent} from './ShowContent';

interface DefaultDialogProps {
    onClose?: (open: boolean) => void;
    bottomBar?: React.ReactNode;
    children?: React.ReactNode;
    loading?: boolean;
    message?: string;
    title?: string;
    open?: boolean;
}


export const DefaultDialog = ({
                                  loading = false,
                                  open = false,
                                  message = '',
                                  title = '',
                                  bottomBar,
                                  children,
                                  onClose
                              }: DefaultDialogProps) => {
    const theme: Theme = useTheme();
    const fullScreen: boolean = useMediaQuery(theme.breakpoints.down('md'));

    const dialogProps = {
        '& .MuiDialog-paper': {
            width: {
                xs: '95vw',
                sm: '90vw',
                md: '80vw',
                lg: '70vw',
                xl: '60vw'
            },
            maxWidth: '1500px'
        }
    }

    return (
        <Dialog onClose={() => onClose?.(false)}
                aria-describedby="alert-dialog-description"
                aria-labelledby="alert-dialog-title"
                fullScreen={fullScreen}
                sx={dialogProps}
                open={open}
                fullWidth>

            <ShowContent show={!!title}>
                <DialogTitle id="responsive-dialog-title">
                    {title}
                </DialogTitle>
            </ShowContent>

            <DialogContent>
                <ShowContent show={!!message}>
                    <DialogContentText>
                        {message}
                    </DialogContentText>
                </ShowContent>

                <ShowContent show={loading}>
                    <div style={{
                            justifyContent: 'center',
                            alignItems:     'center',
                            overflow:       'hidden',
                            height:         '100%',
                            display:        'flex'
                        }}
                    >
                        <CircularProgress size={30}/>
                    </div>
                </ShowContent>

                <ShowContent show={!loading}>
                    <div style={{
                        justifyContent: 'flex-start',
                        alignItems:     'center',
                        overflow:       'hidden',
                        height:         '100%',
                        display:        'flex',
                    }}>
                        {children}
                    </div>
                </ShowContent>
            </DialogContent>

            <DialogActions>
                {bottomBar}
            </DialogActions>
        </Dialog>
    );
};

