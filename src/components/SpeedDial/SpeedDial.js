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

export default function SpeedDials({ details}) {
  const classes = useStyles();
  const { handleClickOpenView, handleClickOpenDelete, handleClickOpenSuspend, handleClickOpen } = useContext(dataContext);
  return (
        <div>
          <List>
            <ListItem button>
              <ListItemAvatar className={classes.avatarContainer}>
                <Avatar className={classes.avatar}>
                  <PopView details={details} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="View" onClick={handleClickOpenView} />
            </ListItem>
            <ListItem button>
              <ListItemAvatar className={classes.avatarContainer}>
                <Avatar className={classes.avatar}>
                  <PopEdit details={details} />
                </Avatar>
              </ListItemAvatar> 
              <ListItemText primary="Edit" onClick={handleClickOpen} />
            </ListItem>
            <ListItem button>
              <ListItemAvatar className={classes.avatarContainer}>
                <Avatar className={classes.avatar}>
                  <PopSuspend details={details} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Suspend" onClick={handleClickOpenSuspend} />
            </ListItem>
            {/* <ListItem button>
              <ListItemAvatar className={classes.avatarContainer}>
                <Avatar className={classes.avatar}>
                  <PopDelete details={details} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Delete" onClick={handleClickOpenDelete} />
            </ListItem> */}
          </List>
        </div>
  );
}
