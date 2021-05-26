import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PupilsUpdate from 'views/UpdateAccount/PupilsUpdate/PupilsUpdate';

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
        <PupilsUpdate />
    </div>
  );
}
