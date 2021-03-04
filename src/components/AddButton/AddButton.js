import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    fab: {
      position: 'fixed',
      bottom: theme.spacing(5),
      right: theme.spacing(4),
    },
  }));

export default function AddButton({ handleClickOpen}) {
    const classes = useStyles()
    return (
        <div style={{right: "12rem", backgroundColor: "red"}}>
            <Fab color="secondary" aria-label="add" className={classes.fab}>
                <AddIcon onClick={handleClickOpen} />
            </Fab>
        </div>
    )
}
