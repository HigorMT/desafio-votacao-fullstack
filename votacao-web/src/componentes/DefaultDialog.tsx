import {CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import React from 'react';
import {useMediaQuery} from '@mui/system';
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
    const theme = useTheme();
    const fullScreen: boolean = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Dialog fullWidth fullScreen={fullScreen} open={open} onClose={() => onClose?.(false)} aria-labelledby="responsive-dialog-title">

            <ShowContent show={!!title}>
                <DialogTitle id="responsive-dialog-title">
                    {title}
                </DialogTitle>
            </ShowContent>

            <DialogContent style={{padding: '20px'}}>
                <ShowContent show={!!message}>
                    <DialogContentText>
                        {message}
                    </DialogContentText>
                </ShowContent>

                <ShowContent show={loading}>
                    <div
                        style={{
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
                    {children}
                </ShowContent>
            </DialogContent>

            <DialogActions>
                {bottomBar}
            </DialogActions>
        </Dialog>
    );
};

