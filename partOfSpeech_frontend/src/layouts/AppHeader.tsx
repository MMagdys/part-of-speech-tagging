import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { PATHS } from '../routes/paths';


export default function AppHeader() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link to={PATHS.root} style={{ textDecoration: 'none', color: 'white' }} >
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              PART OF SPEECH 
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
