/*eslint-disable*/
import React, { useContext, useState, useEffect } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import Snackbar from "components/Snackbar/Snackbar.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import EditPost from "views/Blog/EditPost";
import DialogContainer from "components/Dialog/DialogContainer.js";
import DialogNotification from "components/Dialog/DialogNotification.js";
import { dataContext } from "components/context/DataContext";
import userForm from "../../hooks/useForm";
import config from "utils/config";
import { getContent, postContent, patchContent } from "utils";

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

export default function GeneralAdminNotifications() {
  // const deleteNotifyPost = userForm(sendDeleteNotifyPostToServer);
  // const publishNotifyPost = userForm(sendPublishNotifyPostToServer);
  const acceptNotification = userForm(sendAcceptToServer);
  const rejectNotification = userForm(sendRejectToServer);
  // const DeleteNotification = userForm(sendDeleteNotificationToServer);
  // const EditNotification = userForm(sendEditNotificationToServer);
  const [activeContent, setActiveContent] = useState({
    id: "",
    type: "",
  });
  const [notification, setNotification] = useState();
  const [editId, setEditId] = useState({ id: "" });
  const {
    handleClickOpen,
    handleClickOpenNotification,
    handleCloseNotification,
  } = useContext(dataContext);
  const userId = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const [pageCount, setPageCount] = useState(1)
  const baseUrl = config.API_URL;
  const classes = useStyles();

  useEffect(() => {
    getContent(`${baseUrl}/notification/${userId}/${pageCount}/${50}`, token).then((data) =>
      setNotification(data.data)
    );
  }, [token]);


  async function sendAcceptToServer() {
    try {
      console.log(activeContent)
      acceptNotification.setData("actionTaken", "ACCEPT");
      // acceptNotification.setData("type", activeContent.type);

      const {data} = await patchContent(`${baseUrl}/notification/${activeContent.id}`,
      acceptNotification.values, token);
      alert("Record approved successfully")
      console.log(data);
    } catch ({ message }) {
      alert(message);
    }
  }


  async function sendRejectToServer() {
    try {
      console.log(activeContent)
      rejectNotification.setData("actionTaken", 'REJECT');
      // rejectNotification.setData("type", activeContent.type);

      const {data} = await patchContent(`${baseUrl}/notification/${activeContent.id}`,
      rejectNotification.values, token);
      alert("Record rejected")
      console.log(data);
    } catch ({ message }) {
      alert(message);
    }
  }

  const scrollCheck = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) console.log("Hello you are at the bottom");
    setPageCount(pageCount + 1)
  };

  return (
    <div
      style={{ height: "500px", overflowY: "scroll" }}
      onScroll={(e) => scrollCheck(e)}
    >
      <DialogContainer title="Edit Post" children= {<EditPost id={activeContent.id} />} />
      <Card>
        <DialogContainer
          title="Edit Post"
          children={<EditPost details={editId} />}
        />
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Notifications</h4>
        </CardHeader>
        <CardBody>
          {notification?.notifications.map(
            ({
              message,
              type,
              title,
              _id,
              stateAdmin,
              recipient,
              isSeen,
              user_id,
              actionTaken,
            }) => {
              const renderContent = () => {
                if(type === 'NEW_BLOG') {
                  return (
                    <div key={_id}>
                      
                      {/* <DialogNotification noButton="No" yesButton="Yes" id={_id} title="Delete" children="Are you sure you want to Delete?" handleDelete={deleteNotifyPost.submit} /> */}
                      <SnackbarContent
                        message={
                          <div style={{width: '100%'}}>
                              <h3>{title}</h3>
                              <p>{message}</p>
                              <p style={{textAlign: "right", fontWeight: "bold",
                              margin: ".8rem .5rem", width: '100%'}}>From <span style={{fontWeight: "normal"}} >
                                  - {recipient}</span></p>

                              <ButtonGroup size="small" aria-label="small outlined button group">
                                  <Button
                                    onFocus={() => setActiveContent({
                                      id: _id,
                                      type: type,
                                    })}
                                      onClick={(e) => {
                                        acceptNotification.submit(e);
                                      }}
                                  >
                                    Publish
                                  </Button>
                                  <Button onFocus={() => setActiveContent({
                                      id: _id,
                                      type: type,
                                    })} onClick={handleClickOpen}>Edit</Button>
                                  <Button
                                    onFocus={() => setActiveContent({
                                      id: _id,
                                      type: type,
                                    })}
                                      onClick={(e) => {
                                        rejectNotification.submit(e);
                                      }}
                                  >
                                    Unpublish
                                  </Button>
                              </ButtonGroup>
                          </div>
                        }
                        // close
                        // handleClick={handleClickOpenNotification}
                        // icon={AddAlert}
                      />
                    </div>
                  )
                }
                else if (type === "REGULAR") {
                  return (
                    <SnackbarContent
                      message={
                        <div>
                          <h3>{title}</h3>
                          <p>{message}</p>
                          <p
                            style={{
                              textAlign: "right",
                              fontWeight: "bold",
                              margin: ".8rem .5rem 0",
                            }}
                          >
                            From{" "}
                            <span style={{ fontWeight: "normal" }}>
                              - {recipient}
                            </span>
                          </p>
                          {/* <ButtonGroup size="small" aria-label="small outlined button group">
                          <Button onClick={EditNotification.submit}>Approve</Button>
                          <Button onClick={EditNotification}>Reject</Button> */}
                      {/* </ButtonGroup> */}
                        </div>
                      }
                      icon={AddAlert}
                    />
                  );
                }
                else if (type === "NEW_COOK") {
                  return (
                    <SnackbarContent
                      message={
                        <div>
                          <h3>{title}</h3>
                          <p>{message}</p>
                          <p
                            style={{
                              textAlign: "right",
                              fontWeight: "bold",
                              margin: ".8rem .5rem 0",
                            }}
                          >
                            From{" "}
                            <span style={{ fontWeight: "normal" }}>
                              - {recipient}
                            </span>
                          </p>
                          <ButtonGroup
                            size="small"
                            aria-label="small outlined button group"
                          >
                            <Button
                            onFocus={() => setActiveContent({
                              id: _id,
                              type: type,
                            })}
                              onClick={(e) => {
                                acceptNotification.submit(e);
                              }}
                            >
                              Approve
                            </Button>
                            <Button
                              onFocus={() => setActiveContent({
                                id: _id,
                                type: type,
                              })}
                                onClick={(e) => {
                                  rejectNotification.submit(e);
                                }}
                            >
                              Reject
                            </Button>
                          </ButtonGroup>
                        </div>
                      }
                      icon={AddAlert}
                    />
                  );
                } 
                else {
                  return (
                    <SnackbarContent
                      message={
                        <div>
                          <h3>{title}</h3>
                          <p>{message}</p>
                          <p
                            style={{
                              textAlign: "right",
                              fontWeight: "bold",
                              margin: ".8rem .5rem 0",
                            }}
                          >
                            From{" "}
                            <span style={{ fontWeight: "normal" }}>
                              - {recipient}
                            </span>
                          </p>
                          <ButtonGroup
                            size="small"
                            aria-label="small outlined button group"
                          >
                            <Button
                            onFocus={() => setActiveContent({
                              id: _id,
                              type: type,
                            })}
                              onClick={(e) => {
                                acceptNotification.submit(e);
                              }}
                            >
                              Approve
                            </Button>
                            <Button
                              onFocus={() => setActiveContent({
                                id: _id,
                                type: type,
                              })}
                                onClick={(e) => {
                                  rejectNotification.submit(e);
                                }}
                            >
                              Reject
                            </Button>
                          </ButtonGroup>
                        </div>
                      }
                      icon={AddAlert}
                    />
                  );
                }
              };
              return notification?.notifications ? (
                renderContent()
              ) : (
                <div>No Notification Yet</div>
              );
            }
          )}
        </CardBody>
      </Card>
    </div>
  );
}
