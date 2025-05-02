import React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import {ManageAccounts, Settings} from '@mui/icons-material';
import {ListItemText, MenuList, styled} from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import './Menu.css';
import {Colors} from '../theme';

type MenuChildrenContentProps = Omit<
    MenuContentProps,
    'Icon' | 'open' | 'children'
>;

export const InventoryIconBlue = () => {
    return <InventoryIcon style={{color: '#034da1'}}/>
}

export const SettingsIconBlue = () => {
    return <Settings style={{color: '#034da1'}}/>
}

export const ManageAccountsIconBlue = () => {
    return <ManageAccounts style={{color: '#034da1'}}/>
}

export type MenuContentProps = {
    Icon: any;
    title?: string;
    path?: string;
    open?: boolean;
    children?: MenuChildrenContentProps[];
}

export const MenuItemContainer = styled(MenuItem)(({theme}) => ({
    '&.MuiMenuItem-root': {
        color:                   theme.palette.text.primary,
        cursor:                  'default',
        paddingBottom:           '8px',
        paddingTop:              '8px',
        '& .MuiTypography-root': {
            lineHeight:    '150%',
            letterSpacing: '0.15px'
        }
    }
}));

export const IconItem = styled('div')(() => ({
    paddingRight: '24px',
    cursor:       'pointer',
    height:       '24px'
}));

export interface ListItemTextProps {
    font?: string;
}

export const ListItemTextContainer = styled(ListItemText)<ListItemTextProps>(
    ({theme, font}) => ({
        minWidth:                     '150px',
        cursor:                       'pointer',
        [theme.breakpoints.up('sm')]: {
            minWidth: '250px'
        },
        '& .MuiTypography-root':      {
            fontSize: font || '16px',
            color:    Colors.TEXT_PRIMARY,
            fontWeight: 'bold'
        }
    })
);

export const ExpandIcon = styled('div')(() => ({
    display:        'flex',
    justifyContent: 'center',
    alignItems:     'center',
    '&:hover':      {
        backgroundColor: '#FFF',
        borderRadius:    '50%',
        cursor:          'context-menu'
    }
}));

export interface MenuProps {
    onCloseMenu: (event?: React.KeyboardEvent | React.MouseEvent) => void;
    children?: React.ReactNode
}

export const Menu = ({onCloseMenu, children}: MenuProps) => {
    return (
        <Box onKeyDown={onCloseMenu}>
            <MenuList>
                {children}
            </MenuList>
        </Box>
    );
};


