import React, {useContext} from 'react';
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ExitToApp from '@material-ui/icons/ExitToApp';
import DashboardContext from '../context/DashboardContext';


export default function ToolbarUI(props){
    const {classes} = props;
    const {
      drawerOpen, setDrawerOpen,
      username, logout,
    } = useContext(DashboardContext);
    return (
        <AppBar
        position="absolute"
        className={clsx(classes.appBar, drawerOpen && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => setDrawerOpen(true)}
            className={clsx(
              classes.menuButton,
              drawerOpen && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            {username}
          </Typography>
          <IconButton color="inherit"
            onClick={() => logout()}>
            <ExitToApp />
          </IconButton>
        </Toolbar>
      </AppBar>
    );
}