import React, {useContext} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import PopView from './PopView.js';
import PopEdit from './PopEdit.js';
import PopDelete from './PopDelete.js';
import PopSuspend from './PopSuspend.js';
import { dataContext } from 'components/context/DataContext';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: "transparent",
    height: "50px",
  },
  avatarContainer: {
    margin: "0 auto",
    padding: "0 auto",
  }
});

export default function AdminSpeedDial() {
  const classes = useStyles();
  const { handleClickOpenView, handleClickOpenDelete, handleClickOpenSuspend, handleClickOpenEdit } = useContext(dataContext);
  return (
        <div>
          <List>
            <ListItem button onClick={handleClickOpenView}>
              <ListItemAvatar className={classes.avatarContainer}>
                <Avatar className={classes.avatar}>
                  <PopView />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="View" />
            </ListItem>
            <ListItem button onClick={handleClickOpenEdit}>
              <ListItemAvatar className={classes.avatarContainer}>
                <Avatar className={classes.avatar}>
                  <PopEdit />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Edit" />
            </ListItem>
            <ListItem button onClick={handleClickOpenSuspend}>
              <ListItemAvatar className={classes.avatarContainer}>
                <Avatar className={classes.avatar}>
                  <PopSuspend />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Suspend" />
            </ListItem>
            <ListItem button onClick={handleClickOpenDelete}>
              <ListItemAvatar className={classes.avatarContainer}>
                <Avatar className={classes.avatar}>
                  <PopDelete />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Delete" />
            </ListItem>
          </List>
        </div>
  );
}
