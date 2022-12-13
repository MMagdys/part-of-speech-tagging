import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function AnswerFeedbackSnackBar(props: { open: boolean, setOpen: Function, answer: boolean }) {

    const { open, setOpen, answer } = props;
    const [severity, setSeverity] = React.useState<AlertColor>("info");
    const [message, setMessage] = React.useState("");

    React.useEffect(()=> {
        if(answer == true) {
            setSeverity("success");
            setMessage("Correct Answer");
        }
        else {
            setSeverity("error");
            setMessage("Wrong Answer");
        }
    }, [answer])


    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar anchorOrigin={{ vertical: "bottom", horizontal: "center" }} open={open} autoHideDuration={1000} onClose={handleClose} >
            <Alert  severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    </Stack>
  );
}
