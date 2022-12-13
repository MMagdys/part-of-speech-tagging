import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { PATHS } from '../../routes/paths';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { useNavigate } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import ReplayIcon from '@mui/icons-material/Replay';


export default function PosResult() {
    
    const [score, setScore] = useState<number | null>(null);
    
    const { state } = useLocation();
    const navigate = useNavigate();

    const handleRetakeClick = () => {
        navigate(PATHS.pos.practice)
    }

    const handleHomeClick = () => {
        navigate(PATHS.root)
    }

    useEffect(() => {
        if(state && state.score) {
            setScore(state.score);
        }
    }, [])


    return (
    <Box
        display="flex" 
        flexDirection={"column"}
        alignItems="center"
        justifyContent="center"
        height={'70vh'}
    >
        <Box
            sx={{ margin: '2rem' }}
        >
            <Typography variant='h4' align="center" >
            Your Rank
            </Typography>
        </Box>

        <Box
            sx={{ margin: '2rem' }}
        >
            <EmojiEventsIcon color="success" style={{ fontSize: '128' }} />
        </Box>

        <Box 
            display="flex" 
            alignItems="center"
            justifyContent="center"
            sx={{ margin: '2rem' }}
        >
            <Typography variant='h5' align="center" >
            {score}
            </Typography>
        </Box>

        <Box 
            display="flex" 
            alignItems="center"
            justifyContent="center"
            sx={{ margin: '2rem' }}
        >
            <Button
                id={"choice-button-verb"}
                variant="outlined"
                color="primary"
                startIcon={<ReplayIcon />}
                sx={{ fontSize: '1.5rem', margin: '1rem' }}
                onClick={handleRetakeClick}
            >
                Retake
            </Button>

            <Button
                id={"choice-button-verb"}
                variant="contained"
                color="primary"
                startIcon={<HomeIcon />}
                sx={{ fontSize: '1.5rem', margin: '1rem' }}
                onClick={handleHomeClick}
            >
                Home
            </Button>

        </Box>
    </Box>
  );
}
