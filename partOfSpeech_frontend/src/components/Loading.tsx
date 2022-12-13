import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loading() {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" sx={{ height: '80vh' }}>
      <CircularProgress size={60} />
    </Box>
  );
}