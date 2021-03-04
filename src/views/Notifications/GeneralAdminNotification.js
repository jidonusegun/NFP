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
import {getContent, postContent} from 'utils';

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
  const deleteNotifyPost = userForm(sendDeleteNotifyPostToServer);
  const publishNotifyPost = userForm(sendPublishNotifyPostToServer);
  const suspendNotification = userForm(sendSuspendNotificationToServer);
  const DeleteNotification = userForm(sendDeleteNotificationToServer);
  const EditNotification = userForm(sendEditNotificationToServer);

  const [notification, setNotification] = useState([])
  const [editId, setEditId] = useState({id: ""})
  const { handleClickOpen, handleClickOpenNotification, handleCloseNotification } = useContext(dataContext);

  const token = localStorage.getItem("token")

  useEffect(() => {
    getContent("https://nsfp.herokuapp.com/v1/", token)
    .then(data=>setNotification(data.data))
  }, []);


  async function sendDeleteNotifyPostToServer() {
    handleCloseNotification()
    console.log(sendDeleteNotifyPostToServer.values);
    const response = await postContent("https://nsfp.herokuapp.com/v1/", token);
    // addCook.reset();
    console.log(response);
  }

  async function sendPublishNotifyPostToServer() {
    console.log(sendPublishNotifyPostToServer.values);
    const response = await postContent("https://nsfp.herokuapp.com/v1/", token);
    // addCook.reset();
    console.log(response);
  }

  async function sendDeleteNotificationToServer() {
    console.log(sendSuspendNotificationToServer.values);
    const response = await postContent("https://nsfp.herokuapp.com/v1/", token);
    // addCook.reset();
    console.log(response);
  }

  async function sendEditNotificationToServer() {
    console.log(sendSuspendNotificationToServer.values);
    const response = await postContent("https://nsfp.herokuapp.com/v1/", token);
    // addCook.reset();
    console.log(response);
  }

  async function sendSuspendNotificationToServer() {
    console.log(sendSuspendNotificationToServer.values);
    const response = await postContent("https://nsfp.herokuapp.com/v1/", token);
    // addCook.reset();
    console.log(response);
  }

  const classes = useStyles();
  const [tl, setTL] = React.useState(false);
  const [tc, setTC] = React.useState(false);
  const [tr, setTR] = React.useState(false);
  const [bl, setBL] = React.useState(false);
  const [bc, setBC] = React.useState(false);
  const [br, setBR] = React.useState(false);
  React.useEffect(() => {
    // Specify how to clean up after this effect:
    return function cleanup() {
      // to stop the warning of calling setState of unmounted component
      var id = window.setTimeout(null, 0);
      while (id--) {
        window.clearTimeout(id);
      }
    };
  });
  const showNotification = place => {
    switch (place) {
      case "tl":
        if (!tl) {
          setTL(true);
          setTimeout(function() {
            setTL(false);
          }, 6000);
        }
        break;
      case "tc":
        if (!tc) {
          setTC(true);
          setTimeout(function() {
            setTC(false);
          }, 6000);
        }
        break;
      case "tr":
        if (!tr) {
          setTR(true);
          setTimeout(function() {
            setTR(false);
          }, 6000);
        }
        break;
      case "bl":
        if (!bl) {
          setBL(true);
          setTimeout(function() {
            setBL(false);
          }, 6000);
        }
        break;
      case "bc":
        if (!bc) {
          setBC(true);
          setTimeout(function() {
            setBC(false);
          }, 6000);
        }
        break;
      case "br":
        if (!br) {
          setBR(true);
          setTimeout(function() {
            setBR(false);
          }, 6000);
        }
        break;
      default:
        break;
    }
  };
  return (
    <Card>
        <DialogContainer title="Add Post" children= {<EditPost details={editId} />} />
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Notifications</h4>
      </CardHeader>
      <CardBody>
        {notification.map(({content, title, id, stateAdmin}) => {
          setEditId({id: id})

          const renderContent = () => {
            if(title) {
              return (
                <div key={id}>
                  <DialogContainer title="Edit Post" children= {<EditPost id={id} />} />
                  <DialogNotification noButton="No" yesButton="Yes" id={id} title="Delete" children="Are you sure you want to Delete?" handleDelete={deleteNotifyPost.submit} />
                  <SnackbarContent
                    message={
                      <div>
                          <h3>{title}</h3>
                          <p>{content}</p>
                          <p style={{textAlign: "right", fontWeight: "bold",
                          margin: ".8rem .5rem 0",}}>From <span style={{fontWeight: "normal"}} >
                              - {stateAdmin}</span></p>
                          
                          <ButtonGroup size="small" aria-label="small outlined button group">
                              <Button onClick={publishNotifyPost.submit}>Publish</Button>
                              {/* <Button>Unpublish</Button> */}
                              <Button onClick={handleClickOpen}>Edit</Button>
                          </ButtonGroup>
                      </div>
                    }
                    close
                    handleClick={handleClickOpenNotification}
                    icon={AddAlert}
                  />
                </div>
              )
            }
            else if (suspend) {
              <SnackbarContent
                message={
                  <div>
                      <h3>Notification for Suspension</h3>
                      <p>{content}</p>
                      <ButtonGroup size="small" aria-label="small outlined button group">
                          <Button onClick={suspendNotification.submit}>Approve</Button>
                          <Button onClick={suspendNotification}>Reject</Button>
                      </ButtonGroup>
                  </div>
                }
                close
                // handleClick={handleClickOpenNotification}
                icon={AddAlert}
              />
            }
            else if (edit) {
              <SnackbarContent
                message={
                  <div>
                      <h3>Notification for Editing</h3>
                      <p>{content}</p>
                      <ButtonGroup size="small" aria-label="small outlined button group">
                          <Button onClick={EditNotification.submit}>Approve</Button>
                          <Button onClick={EditNotification}>Reject</Button>
                      </ButtonGroup>
                  </div>
                }
                close
                // handleClick={handleClickOpenNotification}
                icon={AddAlert}
              />
            }
            else if (Notifydelete) {<SnackbarContent
              message={
                <div>
                    <h3>Notification for Deleting</h3>
                    <p>{content}</p>
                    <ButtonGroup size="small" aria-label="small outlined button group">
                        <Button onClick={DeleteNotification.submit}>Approve</Button>
                        <Button onClick={DeleteNotification}>Reject</Button>
                    </ButtonGroup>
                </div>
              }
              close
              // handleClick={handleClickOpenNotification}
              icon={AddAlert}
            />}

          }
          return notification ?
            renderContent()
          : 
          <div>No Notification Yet</div>
        })}
      </CardBody>
    </Card>
  );
}
