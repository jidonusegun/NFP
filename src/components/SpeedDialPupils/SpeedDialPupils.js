import React, {useContext} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import PopViewPupils from './PopViewPupils.js';
import PopEditPupils from './PopEditPupils.js';
import PopDeletePupils from './PopDeletePupils.js';
import PopSuspendPupils from './PopSuspendPupils.js';
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

export default function SpeedDials({deleteContent, details}) {
  const classes = useStyles();
  const { handleClickOpenView, handleClickOpenDelete, handleClickOpenSuspend, handleClickOpen } = useContext(dataContext);
  return (
        <div>
          <List>
            <ListItem button>
              <ListItemAvatar className={classes.avatarContainer}>
                <Avatar className={classes.avatar}>
                  <PopViewPupils details={details} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="View Pupil" onClick={handleClickOpenView} />
            </ListItem>
            <ListItem button>
              <ListItemAvatar className={classes.avatarContainer}>
                <Avatar className={classes.avatar}>
                  <PopEditPupils details={details} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Edit Pupil" onClick={handleClickOpen} />
            </ListItem>
            {details?.status === "suspend" ? null :
            <ListItem button>
              <ListItemAvatar className={classes.avatarContainer}>
                <Avatar className={classes.avatar}>
                  <PopSuspendPupils details={details} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Suspend Pupil" onClick={handleClickOpenSuspend} />
            </ListItem>
            }
            {/* <ListItem button>
              <ListItemAvatar className={classes.avatarContainer}>
                <Avatar className={classes.avatar}>
                  <PopDeletePupils details={details} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Delete Pupil" onClick={handleClickOpenDelete} />
            </ListItem> */}
          </List>
        </div>
  );
}
