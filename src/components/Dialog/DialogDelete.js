import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { dataContext } from '../context/DataContext';

export default function DialogDelete({title, children, noButton, yesButton,  handleDelete}) {
  
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const { openDelete, handleCloseDelete } = useContext(dataContext);

  // const { DeletePost } = useContext(postContext)
  // const handleClick = (e) => {
  //   e.preventDefault();

  //   DeletePost( details.id);

  //   handleCloseDelete();
  // }

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="responsive-dialog-title"
      >
        <button style={{background: "transparent", border: "none", fontWeight: "bold", color: "gray", cursor: "pointer", width: "100px", float: "right", marginTop: "2rem"}} onClick={handleCloseDelete}>Close</button>
        <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
        <DialogContent>
          {children}
        </DialogContent>
        <DialogActions>
          {noButton ? <Button autoFocus onClick={handleCloseDelete} color="primary">
            {noButton}
          </Button> : null}
          {yesButton ? <Button onClick={handleDelete} color="primary" autoFocus>
            {yesButton}
          </Button> : null}
        </DialogActions>
      </Dialog>
    </div>
  );
}
