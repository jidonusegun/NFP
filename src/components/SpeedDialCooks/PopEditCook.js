import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DialogContainer from 'components/Dialog/DialogContainer.js';
import EditCooks from 'views/UserProfile/EditCooks';
import { dataContext } from 'components/context/DataContext';

const useStyles = makeStyles((theme) => ({
  button: {
    display: "block",
    marginTop: "1rem",
    padding: ".5rem .9",
    color: "white",     
    backgroundColor: "#1976d2",
    borderRadius: "50%",
    fontSize: "2rem",
    border: "none",
    cursor: "pointer",
  }, 
}));

export default function PopEdit({details}) {
  const classes = useStyles();
  const {handleClickOpen } = useContext(dataContext);
  return (
        <div>
            <DialogContainer children={<EditCooks details={details} />} />
            <button onClick={handleClickOpen} className={classes.button} title="Edit"><EditIcon /></button>
        </div>
    );
}
