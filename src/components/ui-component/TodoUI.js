import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from "@material-ui/core/IconButton";
import Checkbox from '@material-ui/core/Checkbox';
import { Delete, Bookmark, Refresh } from '@material-ui/icons';
import DashboardContext from '../context/DashboardContext';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
    borderBottom: "1px solid #ededed",
    padding: "5px",
    cursor: "pointer",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  metadata: {
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    marginRight: "20px",
    flexWrap: "wrap"
  },
  button: {
    padding: "5px",
    margin: "0px"
  },
  bookmarked: {
    padding: "5px",
    margin: "0px",
    color: 'gold',
  },
  title: {
    fontWeight: "bold",
    fontSize: "18px",
  },
  timestamp: {
    textAlign: "right"
  },
  summary: {

  }
}));

function formatDate(date) {
  return date.toString().substring(0, 25);
}
export default function TodoUI(props) {
  const classes = useStyles();
  const { todo } = props;
  const {
    todoOnClickHandler,
    bookmarkTodoHandler,
    completeTodoHandler,
    deleteTodoHandler
  } = useContext(DashboardContext);

  let bookmarkClass = todo.bookmarked ? classes.bookmarked : classes.button;
  return (
    <div className={classes.root} onClick={() => todoOnClickHandler(todo)}>
      <div className={classes.metadata}>
        <IconButton className={classes.button}
          onClick={event => {
            event.stopPropagation();
            deleteTodoHandler(todo.id);
          }}>
            {todo.deleted ? <Refresh /> : <Delete />}
          {/* <Delete /> */}
        </IconButton>
        <IconButton className={bookmarkClass}
          onClick={event => {
            event.stopPropagation();
            bookmarkTodoHandler(todo.id);
          }}>
          <Bookmark />
        </IconButton>
        <Checkbox
          checked={todo.completed}
          onClick={event => event.stopPropagation()}
          onChange={event => {
            event.stopPropagation();
            completeTodoHandler(todo.id);
          }}
          color="primary"
          inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
        <span className={classes.title}>{todo.title}</span>
      </div>
      <p>{todo.summary}</p>
      <div className={classes.timestamp}>{formatDate(todo.createdAt)}</div>
    </div>
  )
};