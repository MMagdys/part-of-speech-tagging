import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Routes, Route, Link } from "react-router-dom";
import AppHeader from './AppHeader';
import Home from '../pages/Home';
import { Container } from '@mui/material';
import { PATHS } from '../routes/paths';
import PosPractice from '../pages/pos/PosPractice';


export default function AppLayout() {

  return (
    <Box>
      <AppHeader />
      
      <Box component="main" >
        <Container maxWidth="lg" >
          <Toolbar />
          
          <Routes>
              <Route path={PATHS.pos.practice} element={<PosPractice />} />
              <Route path='*' element={<Home />} />
          </Routes> 

        </Container>
      </Box>
    </Box> 
  );
}
