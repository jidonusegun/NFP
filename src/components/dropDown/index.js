// import Button from '@material-ui/core/Button';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Popover from "@material-ui/core/Popover";
import {
  PopupState,
  bindTrigger,
  bindPopover,
} from "material-ui-popup-state/hooks";

const DropDownMenu = ({ menu, children }) => {
  //     const popupState = usePopupState({
  //         variant: 'popover',
  //         popupId: 'demoMenu',
  //     });

  //     <div {...bindTrigger(popupState)}>{children}</div>
  //             <Menu {...bindMenu(popupState)}>
  //                 {menu.map(({ title, onClick }) => (
  //                     <MenuItem
  //                         onClick={() => {
  //                             popupState.close();
  //                             onClick();
  //                         }}
  //                     >
  //                         {title}
  //                     </MenuItem>
  //                 ))}
  //             </Menu>

  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <div {...bindTrigger(popupState)}>{children}</div>
          {menu.map(({ title, onClick }) => (
            <Popover
              {...bindPopover(popupState)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              {title}
            </Popover>
          ))}
        </div>
      )}
    </PopupState>
  );
};

export default DropDownMenu;
