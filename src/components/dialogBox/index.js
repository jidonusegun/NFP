import React from 'react';
import PropTypes from 'prop-types';
import MuiDialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

export default function Dialog(props) {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    const {
        title, 
        contentText, 
        rejectAction, 
        acceptAction, 
        rejectButton, 
        acceptButton,
    } = props

    return (
        <MuiDialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>{title ? title : "Dialog"}</DialogTitle>
            <DialogContent>
                <DialogContentText>{contentText ? contentText : "This is a DialogBox"}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <button onClick={rejectButton}>{rejectAction ? acceptAction : "No"}</button>
                <button onClick={acceptButton}>{acceptAction ? acceptAction : "Yes"}</button>
            </DialogActions>
        </MuiDialog>
    )
}

Dialog.propTypes = {
    title: PropTypes.string,
    contentText: PropTypes.string,
    rejectAction: PropTypes.object,
    acceptAction: PropTypes.object,
    rejectButton: PropTypes.func,
    acceptButton: PropTypes.func,
}