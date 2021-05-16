/*eslint-disable*/
import React, {useContext, useState, useEffect} from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import Snackbar from "components/Snackbar/Snackbar.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import EditPost from 'views/Blog/EditPost';
import DialogContainer from 'components/Dialog/DialogContainer.js';
import DialogNotification from 'components/Dialog/DialogNotification.js';
import { dataContext } from 'components/context/DataContext';
import userForm from "../../hooks/useForm";
import config from 'utils/config';
import {getContent, postContent, patchContent} from 'utils';

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
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
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

export default function GeneralAdminNotifications() {
  // const deleteNotifyPost = userForm(sendDeleteNotifyPostToServer);
  // const publishNotifyPost = userForm(sendPublishNotifyPostToServer);
  const suspendNotification = userForm(sendSuspendNotificationToServer);
  // const DeleteNotification = userForm(sendDeleteNotificationToServer);
  // const EditNotification = userForm(sendEditNotificationToServer);
  const [activeContent, setActiveContent] = useState({id: '', action: '', type: ''})
  const [notification, setNotification] = useState()
  const [editId, setEditId] = useState({id: ""})
  const { handleClickOpen, handleClickOpenNotification, handleCloseNotification } = useContext(dataContext);
  const userId = localStorage.getItem("id");
  const token = localStorage.getItem("token")
  const baseUrl = config.API_URL


  useEffect(() => {
    getContent(`${baseUrl}/notification/${userId}/${50}`, token)
    .then(data=>setNotification(data.data))
  }, [token]);

  console.log(activeContent)

  // async function sendDeleteNotifyPostToServer() {
  //   handleCloseNotification()
  //   console.log(sendDeleteNotifyPostToServer.values);
  //   const response = await postContent("https://nsfp.herokuapp.com/v1/", token);
  //   // addCook.reset();
  //   console.log(response);
  // }

  // async function sendPublishNotifyPostToServer() {
  //   console.log(sendPublishNotifyPostToServer.values);
  //   const response = await postContent("https://nsfp.herokuapp.com/v1/", token);
  //   // addCook.reset();
  //   console.log(response);
  // }

  // async function sendDeleteNotificationToServer() {
  //   console.log(sendSuspendNotificationToServer.values);
  //   const response = await postContent("https://nsfp.herokuapp.com/v1/", token);
  //   // addCook.reset();
  //   console.log(response);
  // }

  // async function sendEditNotificationToServer() {
  //   console.log(sendSuspendNotificationToServer.values);
  //   const response = await postContent("https://nsfp.herokuapp.com/v1/", token);
  //   // addCook.reset();
  //   console.log(response);
  // }

  async function sendSuspendNotificationToServer(id, action, type) {
    try {

      suspendNotification.setData('actionTaken',activeContent.action)
      suspendNotification.setData('type',activeContent.type)
      if(activeContent?.id){
        
      }
      alert(activeContent?.id)
    // const response = await patchContent(`${baseUrl}/notification/${activeContent?.id}`, suspendNotification.values, token);
    // addCook.reset();
    // alert("Approved Successfully")
    console.log(response);
    } catch ({message}) {
      alert(message)
    }
  }

  const classes = useStyles();
  
  return (
    <Card>
        <DialogContainer title="Edit Post" children= {<EditPost details={editId} />} />
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Notifications</h4>
      </CardHeader>
      <CardBody>
        {notification?.notifications.map(({message, type, title, _id, stateAdmin, recipient, isSeen, user_id, actionTaken}) => {
          
          const renderContent = () => {
            // if(title) {
            //   return (
            //     <div key={id}>
            //       <DialogContainer title="Edit Post" children= {<EditPost id={id} />} />
            //       <DialogNotification noButton="No" yesButton="Yes" id={id} title="Delete" children="Are you sure you want to Delete?" handleDelete={deleteNotifyPost.submit} />
            //       <SnackbarContent
            //         message={
            //           <div>
            //               <h3>{title}</h3>
            //               <p>{message}</p>
            //               <p style={{textAlign: "right", fontWeight: "bold",
            //               margin: ".8rem .5rem 0",}}>From <span style={{fontWeight: "normal"}} >
            //                   - {recipient}</span></p>
                          
            //               <ButtonGroup size="small" aria-label="small outlined button group">
            //                   <Button onClick={publishNotifyPost.submit}>Publish</Button>
            //                   {/* <Button>Unpublish</Button> */}
            //                   <Button onClick={handleClickOpen}>Edit</Button>
            //               </ButtonGroup>
            //           </div>
            //         }
            //         close
            //         handleClick={handleClickOpenNotification}
            //         icon={AddAlert}
            //       />
            //     </div>
            //   )
            // }
            if (type === "REGULAR") {
              return <SnackbarContent
                message={
                  <div>
                      <h3>{title}</h3>
                      <p>{message}</p>
                      <p style={{textAlign: "right", fontWeight: "bold",
                          margin: ".8rem .5rem 0",}}>From <span style={{fontWeight: "normal"}} >
                              - {recipient}</span></p>
                      {/* <ButtonGroup size="small" aria-label="small outlined button group">
                          <Button onClick={EditNotification.submit}>Approve</Button>
                          <Button onClick={EditNotification}>Reject</Button>
                      </ButtonGroup> */}
                  </div>
                }
                icon={AddAlert}
              />
            }
             else {
              return <SnackbarContent
                message={
                  <div>
                      <h3>{title}</h3>
                      <p>{message}</p>
                      <p style={{textAlign: "right", fontWeight: "bold",
                          margin: ".8rem .5rem 0",}}>From <span style={{fontWeight: "normal"}} >
                              - {recipient}</span></p>
                      <ButtonGroup size="small" aria-label="small outlined button group">
                          <Button onClick={(e) => {suspendNotification.submit(e); setActiveContent({id: _id, action: actionTaken, type: type})}}>Approve</Button>
                          <Button onClick={(e) => {suspendNotification.submit(e); setActiveContent({id: _id, action: actionTaken, type: type})}}>Reject</Button>
                      </ButtonGroup>
                  </div>
                }
                icon={AddAlert}
              />
            }

          }
          return notification?.notifications ?
            renderContent()
          : 
          <div>No Notification Yet</div>
        })}
      </CardBody>
    </Card>
  );
}
