import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Routes, Route, Link } from "react-router-dom";
import AppHeader from './AppHeader';


export default function AppLayout() {

  return (
    <Box>
      <AppHeader />
      
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        
        <Routes>
            
        </Routes> 
      </Box>
    </Box> 
  );
}
