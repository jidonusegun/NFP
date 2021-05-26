import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
// import Divider from "@material-ui/core/Divider";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import Dashboard from "@material-ui/icons/Dashboard";
import Search from "@material-ui/icons/Search";
// core components
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import { kCount } from "utils";
import { getContent, postContent } from "utils";
import config from "utils/config";
import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";
import Dialog from "components/useDialog";
import useDialog from "components/useDialog/useHook";
import Loading from "components/isLoading";
import userForm from "hooks/useForm";

const useStyles = makeStyles(styles);

export default function AdminNavbarLinks() {
  const classes = useStyles();
  const [openNotification, setOpenNotification] = React.useState(null);
  const [notificationCount, setNotificationCount] = React.useState();
  const [openProfile, setOpenProfile] = React.useState(null);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("id");
  const baseUrl = config.API_URL;
  const [isLoading, setIsLoading] = useState(false);
  const { openDialog, closeDialog, isOpen } = useDialog();
  const OldPassword = useDialog();
  const [message, setMessage] = useState("");
  const changeUser = userForm(sendToServer);
  const oldAccount = userForm(sendOldToServer);

  useEffect(() => {
    getContent(`${baseUrl}/notification/${userId}/${50}`, token).then((data) =>
      setNotificationCount(data.data)
    );
    // setNotificationCount(data.data.notificationCounts)
    // alert(userId)
  }, [token, userId]);

  const handleClickNotification = (event) => {
    if (openNotification && openNotification.contains(event.target)) {
      setOpenNotification(null);
    } else {
      setOpenNotification(event.currentTarget);
    }
  };
  const handleCloseNotification = () => {
    setOpenNotification(null);
  };
  const handleClickProfile = (event) => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };

  async function sendOldToServer() {
    try {
      setIsLoading(true);
      oldAccount.setData("_id", userId);
      const { data } = await postContent(
        `${baseUrl}/admin/checkpassword`,
        oldAccount.values,
        token
      );
      setIsLoading(false);
      OldPassword.closeDialog();
      openDialog();
    } catch ({ message }) {
      alert(message);
    } finally {
      setIsLoading(false);
    }
  }

  async function sendToServer() {
    try {
      if (changeUser.values.password === changeUser.values.newPassword) {
        alert(changeUser.values.password)
        changeUser.setData("_id", userId);
        delete changeUser.values.newPassword;
        const { data } = await postContent(
          `${baseUrl}/admin/savepassword`,
          changeUser.values,
          token
        );
        alert("User password changed successfully");
        closeDialog();
      } else {
        setMessage("Password did not match");
      }

      setIsLoading(false);
    } catch ({ message }) {
      alert(message);
    } finally {
      setIsLoading(false);
    }
  }

  function logOut() {
    window.localStorage.clear();
    window.location.assign(`http://report.hgsfp.n-sip.gov.ng`)
    handleCloseProfile()
  }

  return (
    <div>
      <Dialog
        open={OldPassword.isOpen}
        handleClose={OldPassword.closeDialog}
        title="Old Password"
        size="sm"
        buttons={[
          {
            value: <>Submit {isLoading && <Loading />}</>,
            onClick: () => sendOldToServer(),
          },
        ]}
      >
        <form>
          <CustomInput
            labelText="Enter Old Password"
            id="password"
            inputProps={{
              type: "password",
              name: "password",
              onChange: (e) => oldAccount.getData(e),
            }}
            formControlProps={{
              fullWidth: true,
            }}
          />
        </form>
      </Dialog>
      <Dialog
        open={isOpen}
        handleClose={closeDialog}
        title="New Password"
        size="sm"
        buttons={[
          {
            value: <>Change {isLoading && <Loading />}</>,
            onClick: () => sendToServer(),
          },
        ]}
      >
        <div style={{color: 'red'}}>{message}</div>
        <form>
          <CustomInput
            labelText="Enter New Password"
            id="newPassword"
            inputProps={{
              type: "password",
              name: "newPassword",
              onChange: (e) => changeUser.getData(e),
            }}
            formControlProps={{
              fullWidth: true,
            }}
          />
          <CustomInput
            labelText="Re-type New Password"
            id="password"
            inputProps={{
              type: "password",
              name: "password",
              onChange: (e) => changeUser.getData(e),
            }}
            formControlProps={{
              fullWidth: true,
            }}
          />
        </form>
      </Dialog>
      <div className={classes.searchWrapper}>
        <CustomInput
          formControlProps={{
            className: classes.margin + " " + classes.search,
          }}
          inputProps={{
            placeholder: "Search",
            inputProps: {
              "aria-label": "Search",
            },
          }}
        />
        <Button color="white" aria-label="edit" justIcon round>
          <Search />
        </Button>
      </div>
      <Link to="/state-admin/home" style={{ color: "black" }}>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-label="Dashboard"
          className={classes.buttonLink}
        >
          <Dashboard className={classes.icons} />
          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Dashboard</p>
          </Hidden>
        </Button>
      </Link>

      <div className={classes.manager}>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={openNotification ? "notification-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleClickNotification}
          className={classes.buttonLink}
        >
          <Notifications className={classes.icons} />
          <span className={classes.notifications}>
            {kCount(notificationCount?.notificationCounts)}
          </span>
          <Hidden mdUp implementation="css">
            <p onClick={handleCloseNotification} className={classes.linkText}>
              Notification
            </p>
          </Hidden>
        </Button>
        <Poppers
          open={Boolean(openNotification)}
          anchorEl={openNotification}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openNotification }) +
            " " +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="notification-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseNotification}>
                  <MenuList role="menu">
                    {notificationCount?.notifications.map(({ message }) => {
                      return (
                        <MenuItem
                          onClick={handleCloseNotification}
                          className={classes.dropdownItem}
                        >
                          {message}
                        </MenuItem>
                      );
                    })}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
      <div className={classes.manager}>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={openProfile ? "profile-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleClickProfile}
          className={classes.buttonLink}
        >
          <Person className={classes.icons} />
          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Profile</p>
          </Hidden>
        </Button>
        <Poppers
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openProfile }) +
            " " +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="profile-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseProfile}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={() => logOut()}
                      className={classes.dropdownItem}
                    >
                      Logout
                    </MenuItem>
                    <MenuItem
                      onClick={() => OldPassword.openDialog()}
                      className={classes.dropdownItem}
                    >
                      Change Password
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
    </div>
  );
}
