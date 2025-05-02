import React, {useCallback, useState} from 'react';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import {styled} from '@mui/material/styles';
import {Box, IconButton, Toolbar, Typography} from '@mui/material';
import {Routes, RoutesProps} from '../router/route-constants';
import {useLocation} from 'react-router-dom';
import {DrawerMenu} from './menu/DrawerMenu';
import {MenuStatic} from './menu/MenuStatic';

import {Menu as MenuIcon} from '@mui/icons-material';

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})<{
    open?: boolean;
}>(({theme, open}) => ({
    flexGrow:   1,
    padding:    theme.spacing(2),
    marginTop:  '150px',
    transition: theme.transitions.create('margin', {
        easing:   theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: 0,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing:   theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0
    }),
    scrollBehavior: 'smooth'
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({theme}) => ({
    borderRadius: 0,

    transition:           theme.transitions.create(['margin', 'width'], {
        easing:   theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    '&.MuiPaper-root':    {
        backgroundColor: theme.palette.primary.main
    },
    '& .MuiToolbar-root': {
        justifyContent: 'space-between',
        paddingRight:   '8px',
        paddingLeft:    '8px'
    }
}));


interface LayoutProps {
    children: React.ReactNode
}

export const Layout = ({children}: LayoutProps): React.JSX.Element => {
    const [open, setOpen] = useState(false);
    const pathname: string = useLocation().pathname;

    const routerName = useCallback((routes: RoutesProps): string => {
        return Object.entries(routes).find(([_, route]): boolean => pathname === (route.path as string))?.[1].title || '';
    }, [pathname]);

    const handleDrawerOpen: () => void = (): void => {
        setOpen(true);
    };

    const handleDrawerClose: () => void = (): void => {
        setOpen(false);
    };

    return (
        <>
            <DrawerMenu handleDrawerClose={handleDrawerClose} open={open}>
                <MenuStatic onCloseMenu={handleDrawerClose}/>
            </DrawerMenu>
            <Box sx={{display: 'flex'}}>
                <AppBar position="fixed" open={open}>
                    {/*<HeaderBar/>*/}
                    <Toolbar>
                        <Typography letterSpacing={0.15}
                                    id={'HEADER_NAME'}
                                    fontWeight={500}
                                    margin={'auto'}
                                    component="div"
                                    fontSize={20}
                                    variant="h6"
                                    noWrap>
                            {routerName(Routes)}
                        </Typography>

                        <IconButton onClick={handleDrawerOpen}
                                    aria-label="open drawer"
                                    color="inherit"
                                    edge="start"
                                    sx={{mr: 2}}>
                            <MenuIcon/>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Main open={open}>{children}</Main>
            </Box>
        </>
    );
};

