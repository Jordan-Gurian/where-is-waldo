import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog({ startTime }) {
  const [open, setOpen] = React.useState(true);
  const [duration, setDuration] = React.useState(0);
  const { gameId } = useParams();
  const navigate = useNavigate();
  const apiURL = import.meta.env.VITE_API_URL;


  //#region timer logic
  async function getDuration() {
    const timerUrl = `${apiURL}/timer/stop`;

    const timerBody = {
    start: startTime,
    };

    const timerBodyString = JSON.stringify(timerBody);

    const timerHeaders = {
        "Content-Type": "application/json"
    };

    const timerOptions = {
        body: timerBodyString,
        method: "POST",
        headers: timerHeaders,
    };
    const timerResponse = await fetch(timerUrl, timerOptions);
    const dur = await timerResponse.json();
    setDuration(dur);
  }
  //#endregion timer logic

  React.useEffect(() => {
    getDuration();
  }, [])

  async function handleSubmit(name) {
    setOpen(false);

    const url = `${apiURL}/leaderboards`;

    const body = {
      name: name,
      time: duration,
      gameId: gameId,
    };

    const bodyString = JSON.stringify(body);

    const headers = {
        "Content-Type": "application/json"
    };

    const options = {
        body: bodyString,
        method: "POST",
        headers: headers,
    };

    try {
      const response = await fetch(url, options);
      console.log(response);
      navigate(`./../../leaderboard/${gameId}`);
    } catch (e) {
      console.log(e);
    }
  };

  function handleExit() {
    setOpen(false);
    navigate("./../../")
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const name = formJson.name;
            console.log(name);
            handleSubmit(name);
          },
        }}
      >
        <DialogTitle>You won!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add your name to the leaderboard and see how you stack up against the fastest times!
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleExit}>Back to home page</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
