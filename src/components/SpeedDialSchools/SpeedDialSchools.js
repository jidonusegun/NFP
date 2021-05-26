import React, {useContext} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import PopViewSchools from './PopViewSchools.js';
import PopEditSchools from './PopEditSchools.js';
import PopDeleteSchools from './PopDeleteSchools.js';
import PopSuspendSchools from './PopSuspendSchools.js';
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
  // console.log(details)
  return (
        <div>
          <List>
            <ListItem button>
              <ListItemAvatar className={classes.avatarContainer}>
                <Avatar className={classes.avatar}>
                  <PopViewSchools details={details} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="View School" onClick={handleClickOpenView} />
            </ListItem>
            <ListItem button>
              <ListItemAvatar className={classes.avatarContainer}>
                <Avatar className={classes.avatar}>
                  <PopEditSchools details={details} />
                </Avatar>
              </ListItemAvatar> 
              <ListItemText primary="Edit School" onClick={handleClickOpen} />
            </ListItem>
            {details?.status === "suspend" ? null :
            <ListItem button>
              <ListItemAvatar className={classes.avatarContainer}>
                <Avatar className={classes.avatar}>
                  <PopSuspendSchools details={details} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Suspend School" onClick={handleClickOpenSuspend} />
            </ListItem>
            }
            <ListItem button>
              <ListItemAvatar className={classes.avatarContainer}>
                <Avatar className={classes.avatar}>
                  <PopDeleteSchools details={details} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Delete School" onClick={handleClickOpenDelete} />
            </ListItem>
          </List>
        </div>
  );
}
