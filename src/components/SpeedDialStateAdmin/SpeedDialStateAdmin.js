import React, {useContext} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import PopViewStateAdmin from './PopViewStateAdmin';
import PopEditStateAdmin from './PopEditStateAdmin';
import PopDeleteStateAdmin from './PopDeleteStateAdmin';
import PopSuspendStateAdmin from './PopSuspendStateAdmin';
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
  const { handleClickOpenView, handleClickOpenDelete, handleClickOpenSuspend, handleClickOpenEdit } = useContext(dataContext);
  return (
        <div>
          <List>
            <ListItem button>
              <ListItemAvatar className={classes.avatarContainer}>
                <Avatar className={classes.avatar}>
                  <PopViewStateAdmin details={details} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="View Admin" onClick={handleClickOpenView} />
            </ListItem>
            <ListItem button>
              <ListItemAvatar className={classes.avatarContainer}>
                <Avatar className={classes.avatar}>
                  <PopEditStateAdmin details={details} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Edit Admin" onClick={handleClickOpenEdit} />
            </ListItem>
            {details?.status === "suspend" ? null :
            <ListItem button>
              <ListItemAvatar className={classes.avatarContainer}>
                <Avatar className={classes.avatar}>
                  <PopSuspendStateAdmin details={details} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Suspend Admin" onClick={handleClickOpenSuspend} />
            </ListItem>
            }
            <ListItem button>
              <ListItemAvatar className={classes.avatarContainer}>
                <Avatar className={classes.avatar}>
                  <PopDeleteStateAdmin details={details} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Delete Admin" onClick={handleClickOpenDelete} />
            </ListItem>
          </List>
        </div>
  );
}
