import React from 'react';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import ProgressBar from '../../components/ProgressBar';
import { checkChoice, getPracticeList } from '../../api/WordApi';
import Loading from '../../components/Loading';
import { PracticeWord } from '../../models/Word';
import AnswerFeedbackSnackBar from '../../components/AnswerFeedbackSnackBar';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../routes/paths';


export default function PosPracticePage() {
    
    const [current, setCurrent] = React.useState(0);
    const [words, setWords] = React.useState<PracticeWord[]>([]);
    const [progress, setProgress] = React.useState(0);
    const [disable, setDisable] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [answer, setAnswer] = React.useState(false);
    const [score, setScore] = React.useState(0);
    const [finished, setFinished] = React.useState(false);
    
    const navigate = useNavigate();
    

    useEffect(() => {
        getPracticeList()
        .then((result: any) => {
            setWords(result.words)
        })
    }, [])


    useEffect(() => {
        if(finished == true) {
            navigate(PATHS.pos.rank, { state: { score, count: words.length } })
        }
    }, [finished])


    const handleChoiceClick = (value: string) => {

        setDisable(true);

        checkChoice({
            wordId: words[current].id,
            userAnswer: value
        })
        .then((res: any) => {
            if(res.result == true) {
                setScore((oldScore) => { return oldScore + 1 });
            }
            setAnswer(res.result)
            setOpen(true);

            const newProgress = ((current + 1) / words.length ) * 100;
            setProgress(newProgress);
    
            if(current + 1 >= words.length) {
                setFinished(true)
                return
            }
    
            setCurrent((old) => old + 1);
            setDisable(false)
        })
    }


    if(words.length < 1) {
        return(
            <Loading />
        )
    }

    return (
    <Box
        display="flex" 
        flexDirection={"column"}
    >
        <Box style={{ width: '20%', marginLeft: 'auto' }} >
            <ProgressBar progress={progress} />
        </Box>

        <Box style={{ paddingTop: '2rem' }}>
            <Typography variant='h6'>Question: {current + 1}</Typography>
        </Box>

        <Box style={{ paddingTop: '1rem', paddingLeft: '2rem' }}>
            <Typography variant='h6'>Choose the appropriate POS for the following word</Typography>
        </Box>

        <Box display="flex"  alignItems="center" justifyContent="center" style={{ padding: '4rem'}}>
            <Typography variant='h2' fontWeight={'bold'} >{words[current].word}</Typography>
        </Box>

        <Box 
            display="flex" 
            alignItems="center"
            justifyContent="center"
            sx={{ margin: '2rem' }}
        >
            <Button
                id={"choice-button-verb"}
                variant="contained"
                color="primary"
                sx={{ fontSize: '1.5rem', margin: '1rem' }}
                disabled={disable}
                onClick={() => { handleChoiceClick("verb") }}
            >verb</Button>

            <Button
                id={"choice-button-noun"}
                variant="contained"
                color="primary"
                sx={{ fontSize: '1.5rem', margin: '1rem' }}
                disabled={disable}
                onClick={() => { handleChoiceClick("noun") }}
            >noun</Button>

            <Button
                id={"choice-button-adverb"}
                variant="contained"
                color="primary"
                sx={{ fontSize: '1.5rem', margin: '1rem' }}
                disabled={disable}
                onClick={() => { handleChoiceClick("adverb") }}
            >adverb</Button>

            <Button
                id={"choice-button-adjective"}
                variant="contained"
                color="primary"
                sx={{ fontSize: '1.5rem', margin: '1rem' }}
                disabled={disable}
                onClick={() => { handleChoiceClick("adjective") }}
            >adjective</Button>
        </Box>
        <AnswerFeedbackSnackBar open={open} setOpen={setOpen} answer={answer}  />    
    </Box>
  );
}
