import React, {useContext} from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import Logo from "../../assets/logo.jpg";
import {FormatListBulleted, PlaylistAddCheck, 
LowPriority, Delete, Bookmark} from '@material-ui/icons';
import * as TodoOperation from '../containers/TodoOperation';
import DashboardContext from '../context/DashboardContext';

export default function SideBarUI(props) {
  const {classes} = props;
  const {
    drawerOpen, setDrawerOpen,
    selectedOperation, sidebarMenuChangeHandler,
  } = useContext(DashboardContext);

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !drawerOpen && classes.drawerPaperClose),
      }}
      open={drawerOpen}
    >
      <div className={classes.toolbarIcon}>
        <ListItem>
          <ListItemIcon>
            <Avatar src={Logo} />
          </ListItemIcon>
          <ListItemText primary="TodoApp" />
        </ListItem>
        <IconButton onClick={() => setDrawerOpen(false)}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem button 
          onClick={() => sidebarMenuChangeHandler(TodoOperation.ALL_TODOS)}
          className={selectedOperation === TodoOperation.ALL_TODOS && classes.drawerPaperActive}>
          <ListItemIcon>
            <FormatListBulleted />
          </ListItemIcon>
          <ListItemText primary="All Todos" />
        </ListItem>
        <ListItem button 
          onClick={() => sidebarMenuChangeHandler(TodoOperation.COMPLETED_TODOS)}
          className={selectedOperation === TodoOperation.COMPLETED_TODOS && classes.drawerPaperActive}>
          <ListItemIcon>
            <PlaylistAddCheck />
          </ListItemIcon>
          <ListItemText primary="Completed Todos" />
        </ListItem>
        <ListItem button 
          onClick={() => sidebarMenuChangeHandler(TodoOperation.INCOMPLETE_TODOS)}
          className={selectedOperation === TodoOperation.INCOMPLETE_TODOS && classes.drawerPaperActive}>
          <ListItemIcon>
            <LowPriority />
          </ListItemIcon>
          <ListItemText primary="Incomplete Todos" />
        </ListItem>
        <ListItem button 
          onClick={() => sidebarMenuChangeHandler(TodoOperation.BOOKMARKED_TODOS)}
          className={selectedOperation === TodoOperation.BOOKMARKED_TODOS && classes.drawerPaperActive}>
          <ListItemIcon>
            <Bookmark />
          </ListItemIcon>
          <ListItemText primary="Bookmarked Todos" />
        </ListItem>
        <ListItem button 
          onClick={() => sidebarMenuChangeHandler(TodoOperation.DELETED_TODOS)}
          className={selectedOperation === TodoOperation.DELETED_TODOS && classes.drawerPaperActive}>
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          <ListItemText primary="Deleted Todos" />
        </ListItem>
      </List>
      {/* <Divider />
      <List>
        <ListSubheader inset>Pinned Todos</ListSubheader>
        {bookmarkedTodos.map(todo => (
        <ListItem key={todo.id} button onClick={() => todoOnClickHandler(todo)}>
          <ListItemIcon>
            <Bookmark />
          </ListItemIcon>
          <ListItemText primary={todo.title} />
        </ListItem>
        ))}
      </List> */}
    </Drawer>
  );
}
