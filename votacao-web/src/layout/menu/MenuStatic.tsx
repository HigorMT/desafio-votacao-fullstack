import React, {useCallback, useState} from 'react';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import EventNoteIcon from '@mui/icons-material/EventNote';
import HomeIcon from '@mui/icons-material/Home';

import {ExpandLess, ExpandMore} from '@mui/icons-material';
import {Collapse} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {Routes} from '../../router/route-constants';
import {ExpandIcon, IconItem, ListItemTextContainer, Menu, MenuContentProps, MenuItemContainer, MenuProps} from './Menu';

const menuOptions: MenuContentProps[] = [
    {
        Icon:  HomeIcon,
        title: Routes.HOME.title,
        path:  Routes.HOME.path,
    },
    {
        Icon:     EventNoteIcon,
        title:    Routes.PAUTA_PESQUISA.title,
        path:     Routes.PAUTA_PESQUISA.path,
        open:     false,
        children: [
            {
                path:  Routes.PAUTA_CADASTRO.path,
                title: Routes.PAUTA_CADASTRO.title,
            },
        ],
    },
    {
        Icon:  HowToVoteIcon,
        title: Routes.VOTACAO_PESQUISA.title,
        path:  Routes.VOTACAO_PESQUISA.path,
    },

];

export const MenuStatic = ({onCloseMenu}: MenuProps): React.JSX.Element => {
    const [menuContent, setMenuContent] = useState<MenuContentProps[]>(menuOptions);
    const history = useNavigate();


    const onClickItem = useCallback((key: string): void => {
        history(key);
        onCloseMenu();
    }, [history, onCloseMenu]);

    const onClickHandler = useCallback((key: string): () => void => {
        return (): void => {
            onClickItem?.(key);
        };
    }, [onClickItem]);


    const updateMenuState = useCallback((key: string): void => {
        const newContentMenu = menuContent.map((item) => {
            if (item.path === key && item?.open !== undefined) {
                return {...item, open: !item.open};
            }

            return {...item};
        });

        setMenuContent(newContentMenu);
    }, [menuContent]);

    return (
        <Menu onCloseMenu={onCloseMenu} >
            {menuContent.map((item: MenuContentProps): React.JSX.Element[] => {
                const Icon = item.Icon;
                return [
                    <MenuItemContainer key={item.path} sx={{marginBottom: item.open ? '0' : '16px'}}>
                        <IconItem onClick={onClickHandler(item?.path || '/')}>
                            <Icon/>
                        </IconItem>
                        <ListItemTextContainer onClick={onClickHandler(item?.path || '/')}>
                            {item.title}
                        </ListItemTextContainer>
                        {item.open !== undefined && (
                            <ExpandIcon onClick={(): void => updateMenuState(item?.path || '/')}>
                                {item.open ? <ExpandLess/> : <ExpandMore/>}
                            </ExpandIcon>
                        )}
                    </MenuItemContainer>,
                    <Collapse key={`${item.path}-collapse`}
                              sx={{marginBottom: '16px'}}
                              in={item.open}
                              timeout={200}
                              unmountOnExit>
                        {item.children?.map((child): React.JSX.Element => (
                            <MenuItemContainer key={child.path} onClick={onClickHandler(child?.path || '/')}>
                                <ListItemTextContainer font="14px">
                                    {child.title}
                                </ListItemTextContainer>
                            </MenuItemContainer>
                        ))}
                    </Collapse>,
                ];
            })}
        </Menu>
    );
};
