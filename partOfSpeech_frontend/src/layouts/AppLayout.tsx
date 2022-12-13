import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Routes, Route, Link } from "react-router-dom";
import AppHeader from './AppHeader';
import Home from '../pages/Home';
import { Container } from '@mui/material';
import { PATHS } from '../routes/paths';
import PosPracticePage from '../pages/pos/PosPractice';
import PosResultPage from '../pages/pos/PosResult';


export default function AppLayout() {

  return (
    <Box>
      <AppHeader />
      
      <Box component="main" >
        <Container maxWidth="lg" >
          <Toolbar />
          
          <Routes>
              <Route path={PATHS.pos.practice} element={<PosPracticePage />} />
              <Route path={PATHS.pos.rank} element={<PosResultPage />} />
              <Route path='*' element={<Home />} />
          </Routes> 

        </Container>
      </Box>
    </Box> 
  );
}
