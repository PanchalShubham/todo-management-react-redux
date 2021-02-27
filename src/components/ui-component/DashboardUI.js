import React, { useContext } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { AddCircle, Cancel } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import SideBarUI from './SideBarUI';
import ToolbarUI from './ToolbarUI';
import EditTodoUI from './EditTodoUI';
import TodosListUI from './TodosListUI';
import DashboardContext from '../context/DashboardContext';
import * as TodoOperation from '../containers/TodoOperation';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    overflowX: "hidden",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  drawerPaperActive: {
    backgroundColor: "#cff4fc"
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  stickyFooter: {
    position: "fixed",
    bottom: "10px",
    right: "20px",
  },
  emptyTrashButton: {
    backgroundColor: "white",
    color: "rgb(220, 0, 78)",
    borderRadius: "50%"
  },
  addTodoButton: {
    backgroundColor: "white",
    color: "#3f51b5",
    borderRadius: "50%"
  },
  header: {
    borderBottom: "1px solid #ededed",
    marginBottom: "20px"
  }
}));







export default function DashboardUI(props) {
  const classes = useStyles();
  const {
    showTodoModal, setShowTodoModal,
    selectedOperation
  } = useContext(DashboardContext);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <ToolbarUI classes={classes} />
      <SideBarUI classes={classes} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Typography className={classes.header} component="h1" variant="h5">
            {String(selectedOperation).toUpperCase()}
          </Typography>
          <TodosListUI />
        </Container>
      </main>
      {showTodoModal && <EditTodoUI />}
      <span className={classes.stickyFooter}>
        {selectedOperation === TodoOperation.DELETED_TODOS &&
        <Button className={classes.emptyTrashButton} 
          onClick={() => setShowTodoModal(true)}>
          <Cancel className="addTodoButton" />
        </Button>}
        <Button  className={classes.addTodoButton}
          onClick={() => setShowTodoModal(true)}>
          <AddCircle className="addTodoButton" />
        </Button>
      </span>
    </div>
  );
}
