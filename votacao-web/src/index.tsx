import React from 'react';
import ReactDOM, {Root} from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {StyledEngineProvider, ThemeProvider} from '@mui/material';
import {theme} from './layout/theme';
import {Layout} from './layout/Layout';

const baseName: string = window.__APP_BASE__ || '/';

const root: Root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <BrowserRouter basename={baseName}>
        <ThemeProvider theme={theme}>
            <StyledEngineProvider injectFirst={true}>
                <Layout>
                    <App/>
                </Layout>
            </StyledEngineProvider>
        </ThemeProvider>
    </BrowserRouter>
);

