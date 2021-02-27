import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from "@material-ui/core/IconButton";
import {Delete, Bookmark} from '@material-ui/icons';
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

function formatDate(dateString){
  return dateString.substring(0, 25);
}
export default function TodoUI(props){
    const classes = useStyles();
    const {todo} = props;
    const {
      todoOnClickHandler
    } = useContext(DashboardContext);
    let bookmarkClass = todo.bookmarked ? classes.bookmarked : classes.button;
    return (
      <div className={classes.root} onClick={() => todoOnClickHandler(todo)}>
        <div className={classes.metadata}>
          <IconButton className={classes.button}>
              <Delete />
          </IconButton>
          <IconButton className={bookmarkClass}>
              <Bookmark/>
          </IconButton>
          <span className={classes.title}>{String(todo.title).substring(0, 100)}</span>
        </div>
          <p>{todo.summary}</p>
          <div className={classes.timestamp}>{formatDate(todo.createdAt)}</div>
      </div>
    )
};