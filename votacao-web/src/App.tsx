import React from 'react';
import './App.css';
import {Grid} from '@mui/material';
import RouterManager from './router/RouterManager';

function App(): React.JSX.Element {
  return (
    <div className="App">
        <Grid container spacing={0}>
            <Grid item xs={12} md={12}>
                <RouterManager />
            </Grid>
        </Grid>
    </div>
  );
}

export default App;
