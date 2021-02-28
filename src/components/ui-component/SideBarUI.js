import React, { useContext } from "react";
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
import {
  FormatListBulleted, PlaylistAddCheck,
  LowPriority, Delete, Bookmark,
  ClearAll
} from '@material-ui/icons';
import * as Filters from '../../redux/constants/filters';
import DashboardContext from '../context/DashboardContext';

export default function SideBarUI(props) {
  const { classes } = props;
  const {
    drawerOpen, setDrawerOpen,
    selectedOperation, sidebarMenuChangeHandler,
  } = useContext(DashboardContext);

  let operations = [
    { operation: Filters.ACTIVE_TODOS, icon: <FormatListBulleted /> },
    { operation: Filters.COMPLETED_TODOS, icon: <PlaylistAddCheck /> },
    { operation: Filters.INCOMPLETE_TODOS, icon: <LowPriority /> },
    { operation: Filters.BOOKMARKED_TODOS, icon: <Bookmark /> },
    { operation: Filters.DELETED_TODOS, icon: <Delete /> },
    { operation: Filters.ALL_TODOS, icon: <ClearAll /> },
  ]

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
        {operations.map(item => (
          <ListItem key={item.operation} button
            onClick={() => sidebarMenuChangeHandler(item.operation)}
            className={selectedOperation === item.operation && classes.drawerPaperActive}>
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.operation} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
