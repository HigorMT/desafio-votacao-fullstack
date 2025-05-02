import {Box, Toolbar} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {Routes} from '../router/route-constants';
import HomeIcon from '@mui/icons-material/Home';

export const HeaderBar = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ padding: '10px 15px 10px 25px', background: '#FAFAFA' }}>
            <Toolbar sx={{ borderRadius: 0, display: 'flex' }} >
                <div onClick={(): void => navigate(`${Routes.HOME.path}`)}>
                   <HomeIcon />
                </div>
            </Toolbar>
        </Box>
    );
};

