import React, { useContext, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import CloseIcon from "@material-ui/icons/Close";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import DashboardContext from '../context/DashboardContext';

const MAX_TITLE_LENGTH = 10;
const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  error: {
    color: "red",
    fontSize: "10px"
  },
  transparent: {
    fontSize: "10px",
    opacity: 0
  }
}));

export default function EditTodoUI(props) {
  const classes = useStyles();
  const {
    selectedTodo, saveTodoHandler, closeTodoModal
  } = useContext(DashboardContext);
  const [title, setTitle] = useState(selectedTodo ? selectedTodo.title : '');
  const [summary, setSummary] = useState(selectedTodo ? selectedTodo.summary : '');

  const onSubmitHandler = (event) => {
    event.preventDefault();
    let length = title.trim().length;
    if (length > MAX_TITLE_LENGTH) return;
    if (length === 0) return;
    closeTodoModal();
    saveTodoHandler(selectedTodo ? selectedTodo.id : null, title, summary);
  };

  return (
    <div>
      <Dialog
        open={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <div className={classes.header}>
            <span>{selectedTodo ? "Edit Todo" : "Add Todo"}</span>
            <IconButton onClick={closeTodoModal}>
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <form className={classes.form} onSubmit={onSubmitHandler}
              noValidate autoComplete="off">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField fullWidth label="Title" variant="outlined"
                    error={title.length > MAX_TITLE_LENGTH}
                    autoFocus 
                    value={title}
                    required
                    onChange={(event) => setTitle(event.target.value)} />
                    <span className={title.length > MAX_TITLE_LENGTH ? classes.error : classes.transparent}>
                      Max {MAX_TITLE_LENGTH} characters are allowed</span>
                </Grid>
                <Grid item xs={12}>
                  <TextField id="summary" multiline fullWidth rows="5"
                    label="Summary" variant="outlined"
                    value={summary}
                    onChange={(event) => setSummary(event.target.value)} />
                </Grid>
              </Grid>

            </form>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeTodoModal} color="secondary">
            Cancel
          </Button>
          <Button onClick={onSubmitHandler} color="primary" autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
