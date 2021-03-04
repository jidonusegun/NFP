import React, {useContext} from 'react';
import MUPopover from '@material-ui/core/Popover';
import { dataContext} from 'components/context/DataContext';


export default function Popover({children}) {

  const { anchorEl, handleClosePop } = useContext(dataContext);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <MUPopover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePop}
        // PaperProps={{onMouseLeave: handleClosePop}}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {children}
      </MUPopover>
    </div>
  );
}
