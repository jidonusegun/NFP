import React, {useContext} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import PopViewAggregator from './PopViewAggregator.js';
import PopEditAggregator from './PopEditAggregator.js';
import PopDeleteAggregator from './PopDeleteAggregator.js';
import PopSuspendAggregator from './PopSuspendAggregator.js';
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
                  <PopViewAggregator details={details} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="View Aggregator" onClick={handleClickOpenView} />
            </ListItem>
            <ListItem button>
              <ListItemAvatar className={classes.avatarContainer}>
                <Avatar className={classes.avatar}>
                  <PopEditAggregator details={details} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Edit Aggregator" onClick={handleClickOpen} />
            </ListItem>
            {details?.status === "suspend" ? null :
            <ListItem button>
              <ListItemAvatar className={classes.avatarContainer}>
                <Avatar className={classes.avatar}>
                  <PopSuspendAggregator details={details} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Suspend Aggregator" onClick={handleClickOpenSuspend} />
            </ListItem>
            }
            <ListItem button>
              <ListItemAvatar className={classes.avatarContainer}>
                <Avatar className={classes.avatar}>
                  <PopDeleteAggregator details={details} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Delete Aggregator" onClick={handleClickOpenDelete} />
            </ListItem>
          </List>
        </div>
  );
}
