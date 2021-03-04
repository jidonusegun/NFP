import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { dataContext } from '../context/DataContext';

export default function DialogSuspend({title, children, noButton, yesButton, handleSuspend}) {
  
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const { openSuspend, handleCloseSuspend } = useContext(dataContext);

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={openSuspend}
        fullWidth
        onClose={handleCloseSuspend}
        aria-labelledby="responsive-dialog-title"
      >
        <button style={{background: "transparent", border: "none", fontWeight: "bold", color: "gray", cursor: "pointer", width: "100px", float: "right", marginTop: "2rem"}} onClick={handleCloseSuspend}>Close</button>
        <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
        <DialogContent>
          {children}
        </DialogContent>
        <DialogActions>
          {noButton ? <Button onClick={handleCloseSuspend} color="primary">
            {noButton}
          </Button> : null}
          {yesButton ? <Button onClick={handleSuspend} color="primary">
            {yesButton}
          </Button> : null}
        </DialogActions>
      </Dialog>
    </div>
  );
}
