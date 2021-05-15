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
  const baseUrl = localStorage.getItem("baseUrl")

  const [goingUp, setGoingUp] = useState(false);

  useEffect(() => {
    getContent(
      `${baseUrl}/notification/${userId}/${50}`,
      token
    ).then((data) => setNotification(data.data.notifications));

    // const handleScroll = () => {
    //   console.log("")
    //   const currentScrollY = window.scrollY;
    //   if (prevScrollY.current < currentScrollY && goingUp) {
    //     setGoingUp(false);
        
    //   }
    //   if (prevScrollY.current > currentScrollY && !goingUp) {
    //     setGoingUp(true);
    //   }

    //   if(currentScrollY >= 6400){
    //     console.log("call api");

      
    //   }
    //   prevScrollY.current = currentScrollY;
    //   console.log(goingUp, currentScrollY);
    // };
    
    // window.addEventListener("scroll", handleScroll(), { passive: true });

    // return () => window.removeEventListener("scroll", handleScroll());

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

    // return () => window.removeEventListener("scroll", handleScroll());

  },[goingUp])



    
  //   // const handleScroll = () => {
  //   //   const currentScrollY = window.scrollY;
  //   //   if (prevScrollY.current < currentScrollY && goingUp) {
  //   //     setGoingUp(false);
  //   //     console.log("Now at the bottom")
  //   //   }
  //   //   if (prevScrollY.current > currentScrollY && !goingUp) {
  //   //     setGoingUp(true);
  //   //     console.log("Now at the top")
  //   //   }
  //   //   // console.log(`scroll, ${window.ScrollY}`)
  //   //   prevScrollY.current = currentScrollY;
  //   //   console.log(goingUp, currentScrollY);
  //   // };

  //   // window.addEventListener("scroll", handleScroll, { passive: true });

  //   // return () => window.removeEventListener("scroll", handleScroll);
  // }, [goingUp]);
//   console.log(notification)
//   // document.body.scrollHeight.scrollTo()
//   // window.scrollTop() >= document.height() - window.height() - 10


const scrollCheck = (event) => {
  const target = event.target
  if(target.scrollHeight - target.scrollTop === target.clientHeight){
    alert("You are at the bottom")
  }
}

// function handleScroll() {
//   const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
//   const body = document.body;
//   const html = document.documentElement;
//   const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
//   const windowBottom = windowHeight + window.pageYOffset;
  
//   if (windowBottom >= docHeight) {
//     setState({
//       message:'bottom reached'
//     });console.log(docHeight, windowBottom)
//   } else {
//     setState({
//       message:'not at bottom'
//     });
//   }
// }

// window.addEventListener("scroll", handleScroll());

// document.documentElement.getBoundingClientRect.bo

  return (
    <div style={{height: '500px', overflowY: 'scroll'}} onScroll={() => scrollCheck()} >
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
