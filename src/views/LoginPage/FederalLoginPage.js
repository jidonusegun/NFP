import React, { useState, useContext } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
// React Router
import { Redirect, Link } from "react-router-dom";
// @material-ui/icons
import People from "@material-ui/icons/People";
import LockOpenIcon from "@material-ui/icons/LockOpen";
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// core components
import { postContent, postContentLogin, getContent } from "../../utils";
import { dataContext } from "components/context/DataContext";
import DialogSuspend from "components/Dialog/DialogSuspend.js";
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import image from "assets/img/bg7.jpg";
import userForm from "../../hooks/useForm";
import Loading from "components/isLoading";
import Toast from "components/toast";
import Dialog from "components/useDialog";
import useDialog from "components/useDialog/useHook";
import config from 'utils/config';

const useStyles = makeStyles(styles); 

export default function LoginPage(props) {
  const { openDialog, closeDialog, isOpen } = useDialog();
  const addLogin = userForm(sendLoginToServer);
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [validate, setValidate] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState("");
  const [getEmail, setGetEmail] = useState()
  const [isLoading, setIsLoading] = useState(false);

  const { handleClickOpenSuspend, handleCloseSuspend, setToken } = useContext(
    dataContext
  );
  const baseUrl = config.API_URL
  var token = localStorage.getItem("token");

  const handleEmailChange = (e) => {
    setGetEmail({[e.target.name]: e.target.value})
  }

  async function sendToServer() {
    try {
      setMessage('')
      if (getEmail.forgotPassword !== '') {
        setIsLoading(true)
        const {msg} = await getContent(
          `${baseUrl}/admin/recoverpassword/${getEmail.forgotPassword}`,
          token
        );
        setMessage(msg)
        closeDialog();
      } else {
        setMessage("Please enter your email address");
      }
    } catch ({ message }) {
      alert(message);
    }
    finally {
      setIsLoading(false)
    }
  }

  async function sendLoginToServer() {
    try {
      setIsLoading(true);
      const response = await postContentLogin(
        `${baseUrl}/admin/login`,
        addLogin.values
      );

      const body = await response;

      setToken(body.data.token);

      localStorage.setItem("token", body.data.token);
      localStorage.setItem("state", body.data.state);
      localStorage.setItem("lga", body.data.lga);
      localStorage.setItem("id", body.data._id);

      if (body.success === true && body.data.role === "SUPER_ADMIN") {
        setLoggedIn(true);
      } else {
        setValidate(true);
      }

      setIsLoading(false);
    } catch ({ message }) {
      alert(message);
    }
    setIsLoading(false);
  }

  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;

  return (
    <>
      <Dialog
        open={isOpen}
        handleClose={closeDialog}
        title="Retrieve your Account"
        size="sm"
        buttons={[
          {
            value: <>Send {isLoading && <Loading />}</>,
            onClick: (e) => sendToServer(e),
          },
        ]}
      >
        <>
          <div style={{ color: "red", textAlign: "center" }}>{message}</div>
          <CustomInput
            labelText="Enter your email"
            id="forgotPassword"
            inputProps={{
              type: "text",
              name: "forgotPassword",
              onChange: (e) => handleEmailChange(e),
            }}
            formControlProps={{
              fullWidth: true,
            }}
          />
        </>
      </Dialog>

      {loggedIn ? <Redirect to="/admin/home" /> : null}
      <div>
        <Header
          absolute
          color="transparent"
          brand="NHGSFRT"
          rightLinks={<HeaderLinks />}
          {...rest}
        />
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center",
          }}
        >
          {/* onSubmit={formik.handleSubmit}  */}
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={4}>
                <Card className={classes[cardAnimaton]}>
                  <form className={classes.form}>
                    <CardHeader color="rose" className={classes.cardHeader}>
                      <h4>Federal Admin Login</h4>
                    </CardHeader>
                    <div className={classes.federalLogin}>
                      Or login as a <Link to="/login-page">State Admin</Link>
                    </div>
                    <CardBody>
                      <div
                        className={validate ? classes.dBlock : classes.dNone}
                      >
                        Incorrect username or password
                      </div>

                      <div
                        className={
                          passwordCheck ? classes.dBlockPassword : classes.dNone
                        }
                      >
                        Check your email to get your password{" "}
                      </div>
                      <CustomInput
                        labelText="Username"
                        id="username"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          type: "text",
                          name: "usernames",
                          onChange: (e) => addLogin.getData(e),
                          // value: addLogin.values.username,
                          endAdornment: (
                            <InputAdornment position="end">
                              <People className={classes.inputIconsColor} />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <CustomInput
                        labelText="Password"
                        id="password"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          type: "password",
                          name: "password",
                          onChange: (e) => addLogin.getData(e),
                          // value: addLogin.values.password,
                          endAdornment: (
                            <InputAdornment position="end">
                              <LockOpenIcon
                                className={classes.inputIconsColor}
                              />
                            </InputAdornment>
                          ),
                          autoComplete: "off",
                        }}
                      />
                      {/* </form> */}
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      {/* <Link to="/state-admin/home">  */}
                      <Button
                        type="submit"
                        onClick={addLogin.submit}
                        simple
                        color="primary"
                        size="lg"
                      >
                        Login
                      </Button>
                      {/* </Link> */}
                      {isLoading && <Loading />}
                      <Toast message={message} />
                    </CardFooter>
                    <div className={classes.forgotPasswordContainer}>
                      Forgotten Password?{" "}
                      <span
                        onClick={() => openDialog()}
                        className={classes.forgotPassword}
                      >
                        Click here
                      </span>
                    </div>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
          <Footer whiteFont />
        </div>
      </div>
    </>
  );
  // Loading Data... Please wait
}
