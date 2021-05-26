import React, { useContext } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import PopViewCook from "./PopViewCook.js";
import PopEditCook from "./PopEditCook.js";
import PopDeleteCook from "./PopDeleteCook.js";
import PopSuspendCook from "./PopSuspendCook.js";
import { dataContext } from "components/context/DataContext";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: "transparent",
    height: "50px",
  },
  avatarContainer: {
    margin: "0 auto",
    padding: "0 auto",
  },
});

export default function SpeedDials({ deleteContent, details }) {
  const classes = useStyles();
  const {
    handleClickOpenView,
    handleClickOpenDelete,
    handleClickOpenSuspend,
    handleClickOpen,
  } = useContext(dataContext);
  console.log(details);
  return (
    <div>
      <List>
        <ListItem button>
          <ListItemAvatar className={classes.avatarContainer}>
            <Avatar className={classes.avatar}>
              <PopViewCook details={details} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="View Cook" onClick={handleClickOpenView} />
        </ListItem>
        <ListItem button>
          <ListItemAvatar className={classes.avatarContainer}>
            <Avatar className={classes.avatar}>
              <PopEditCook details={details} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Edit Cook" onClick={handleClickOpen} />
        </ListItem>
        {details?.status === "suspend" ? null : (
          <ListItem button>
            <ListItemAvatar className={classes.avatarContainer}>
              <Avatar className={classes.avatar}>
                <PopSuspendCook details={details} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Suspend Cook" onClick={handleClickOpenSuspend} />
          </ListItem>
        )}
        <ListItem button>
          <ListItemAvatar className={classes.avatarContainer}>
            <Avatar className={classes.avatar}>
              <PopDeleteCook details={details} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Delete Cook" onClick={handleClickOpenDelete} />
        </ListItem>
      </List>
    </div>
  );
}
