import {styled} from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import {Typography} from '@mui/material';
import React from 'react';

interface DrawerMenuProps {
    children: React.ReactNode;
    open: boolean;
    handleDrawerClose: () => void;
}

const DrawerHeader = styled('div')(({theme}) => ({
    display:    'flex',
    alignItems: 'center',
    padding:    theme.spacing(2, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'left'
}));

export const DrawerMenu = ({handleDrawerClose, children, open}: DrawerMenuProps): React.JSX.Element => {

    const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent): void => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        handleDrawerClose();
    };

    return (
        <Drawer style={{height: '100vh', position: 'relative'}}
                sx={{'& .MuiPaper-root': {borderRadius: 0}}}
                onClose={toggleDrawer}
                anchor="right"
                open={open}>
            <div style={{borderRadius: 0}}>
                <DrawerHeader>
                    <Typography component={'h2'}
                                style={{
                                    fontStyle:     'normal',
                                    fontSize:      '24px',
                                    padding:       '16px',
                                    fontWeight:    'bold',
                                    paddingBottom: 0,
                                }}>
                        Menu
                    </Typography>
                </DrawerHeader>
                {children}
            </div>
        </Drawer>
    );
};
