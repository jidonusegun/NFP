import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import UpdateAdmin from 'views/UpdateAccount/UpdateAdmin';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    // height: 324,
  },
}));

export default function VerticalTabs({details}) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
        <UpdateAdmin details={details} />
    </div>
  );
}
