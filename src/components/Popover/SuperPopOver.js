import React, {useContext} from 'react';
import MUPopover from '@material-ui/core/Popover';
import { dataContext} from 'components/context/DataContext';


export default function Popover({children}) {

  const { anchorElSuper, handleClosePopSuper } = useContext(dataContext);

  const open = Boolean(anchorElSuper);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <MUPopover
        id={id}
        open={open}
        anchorEl={anchorElSuper}
        onClose={handleClosePopSuper}
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
