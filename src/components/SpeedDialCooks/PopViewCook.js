import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ViewListIcon from '@material-ui/icons/ViewList';
import DialogView from 'components/Dialog/DialogView.js';
import CooksAccountView from 'views/ViewProfile/CooksAccountView/CooksAccountView';
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

export default function PopView({details}) {
  const classes = useStyles();
  const { handleClickOpenView } = useContext(dataContext);
  return (
        <div>
            <DialogView children={<CooksAccountView details={details} />} title="Profile" />
            <button onClick={handleClickOpenView} className={classes.button} title="View"><ViewListIcon /></button>
        </div>
    );
}
