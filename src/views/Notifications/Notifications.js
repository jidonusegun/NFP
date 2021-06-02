/*eslint-disable*/
import React, { useContext, useEffect, useState, useRef } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import Snackbar from "components/Snackbar/Snackbar.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import DialogNotification from "components/Dialog/DialogNotification.js";
import { dataContext } from "components/context/DataContext";
import { getContent } from "utils";
import config from 'utils/config';

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const useStyles = makeStyles(styles);

export default function Notifications() {
  const [notification, setNotification] = useState([]);
  const classes = useStyles();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("id");
  const [state, setState] = useState({message: 'not at bottom'})
  const prevScrollY = useRef(0);
  const [pageCount, setPageCount] = useState(1)
  const baseUrl = config.API_URL

  const [goingUp, setGoingUp] = useState(false);

  useEffect(() => {
    getContent(
      `${baseUrl}/notification/${userId}/${pageCount}/50`,
      token
    ).then((data) => console.log(data.data));
  }, [token, userId]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (prevScrollY.current < currentScrollY && goingUp) {
        setGoingUp(false);
        
      }
      if (prevScrollY.current > currentScrollY && !goingUp) {
        setGoingUp(true);
      }
      prevScrollY.current = currentScrollY;
      console.log(goingUp, currentScrollY);
    };

    window.addEventListener("scroll", handleScroll(), { passive: true });

  },[goingUp])


const scrollCheck = (e) => {
  const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
  if(bottom) console.log("Hello you are at the bottom")
  setPageCount(pageCount + 1)
}

  return (
    <div style={{height: '500px', overflowY: 'scroll'}} onScroll={(e) => scrollCheck(e)} >
    <Card  >
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Notifications</h4>
      </CardHeader>
      <CardBody>
        {notification?.length > 0 ? (
          <>
            {notification.map(({ message, _id }) => {
              return (
                <div key={_id} onScroll={(e) => scrollCheck(e)}>
                  <SnackbarContent
                    message={message}
                    icon={AddAlert}
                  />
                </div>
              );
            })}
          </>
        ) : (
          <div>No New Notification</div>
        )}
      </CardBody>
    </Card>
    </div>
  );
}
