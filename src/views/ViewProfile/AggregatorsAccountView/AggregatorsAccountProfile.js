import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AggregatorsUpdate from 'views/UpdateAccount/AggregatorsUpdate/AggregatorsUpdate';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    // height: 324,
  },
}));

export default function VerticalTabs() {

  return (
    <div className={classes.root}>
        <AggregatorsUpdate />
    </div>
  );
}
