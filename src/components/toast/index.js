import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

export default function PositionedSnackbar({message}) {
    const [open, setOpen] = React.useState(message ? true : false);

    const handleClose = () => {
        setOpen(false); 
    };

    return (
        <div>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={open}
                onClose={(handleClose)}
                message={message}
            />
        </div>
    );
}
