import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { PATHS } from '../routes/paths';


export default function Home() {

  return (
    <Box
        display="flex" 
        flexDirection={"column"}
        alignItems="center"
        justifyContent="center"
        height={'70vh'}
    >
        <Box>
            <Typography variant='h5' align="center" >
            In English language, words can be categorized according to their syntactic functions, which is known as "Part of Speech".
            Examples of part of speech: noun, verb, adjective, adverb
            </Typography>
        </Box>

        <Box 
            display="flex" 
            alignItems="center"
            justifyContent="center"
            sx={{ margin: '2rem' }}
        >
            <Link to={PATHS.pos.practice} style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="secondary" sx={{ fontSize: '2rem' }} >Practice</Button>
            </Link>
        </Box>      
    </Box>
  );
}
