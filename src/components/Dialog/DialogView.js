import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { dataContext } from '../context/DataContext';

export default function DialogView({title, children, noButton, yesButton}) {
  
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const { openView, handleCloseView } = useContext(dataContext);

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={openView}
        onClose={handleCloseView}
        aria-labelledby="responsive-dialog-title"
      >
        <button style={{background: "transparent", border: "none", fontWeight: "bold", color: "gray", cursor: "pointer", width: "100px", float: "left", marginTop: "2rem"}} onClick={handleCloseView}>Close</button>
        <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
        <DialogContent>
          {children}
        </DialogContent>
        <DialogActions>
          {noButton ? <Button onClick={handleCloseView} color="primary">
            {noButton}
          </Button> : null}
          {yesButton ? <Button onClick={handleCloseView} color="primary">
            {yesButton}
          </Button> : null}
        </DialogActions>
      </Dialog>
    </div>
  );
}
