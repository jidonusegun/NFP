import React, { useState, useContext, useEffect } from "react";
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
  const changePassword = userForm(sendToServer);
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [validate, setValidate] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState("");
  const [getEmail, setGetEmail] = useState()
  const [isLoading, setIsLoading] = useState(false);
  const [recoverId, setRecoverId] = useState()
  const baseUrl = config.API_URL
  const routeParams = props.match.params.emailCode
  const token = localStorage.getItem("token");


  // useEffect(() => {
  //   const response = getContent(`${baseUrl}/random/${routeParams}`)
  //   const body = await response
  //   setRecoverId(body?._id)
  //   if(body.success === true){
  //     setLoggedIn(true)
  //   }
  // },[routeParams])

  const { handleClickOpenSuspend, handleCloseSuspend, setToken } = useContext(
    dataContext
  );


  async function sendToServer() {
    try {
      if (changePassword.values.password === changePassword.values.newPassword) {
        changePassword.setData("uniqueCode", routeParams);
        delete changePassword.values.password;
        const response = await postContent(
          `${baseUrl}/random`,
          changePassword.values,
          token
        );
        
        if(response.success === true) {
          alert("Password reset successfully");
          setLoggedIn(true)
        } else {
          alert("An error occur");
        }
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


  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
//  console.log(props.match.params.name)
 
  return  (
    <>
    {loggedIn ? <Redirect to="/login-page" /> : null}
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
                    <CardHeader color="success" className={classes.cardHeader}>
                      <h4>Reset Password</h4>
                    </CardHeader>
                    <CardBody>
                      <div
                        className={validate ? classes.dBlock : classes.dNone}
                      >
                        {message}
                      </div>

                      {/* <div
                        className={
                          passwordCheck ? classes.dBlockPassword : classes.dNone
                        }
                      >
                        Check your email to get your password{" "}
                      </div> */}
                        <CustomInput
                            labelText="Enter New Password"
                            id="newPassword"
                            inputProps={{
                            type: "password",
                            name: "newPassword",
                            onChange: (e) => changePassword.getData(e),
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
                            onChange: (e) => changePassword.getData(e),
                            }}
                            formControlProps={{
                            fullWidth: true,
                            }}
                        />
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      {/* <Link to="/state-admin/home">  */}
                      <Button
                        type="submit"
                        onClick={changePassword.submit}
                        simple
                        color="primary"
                        size="lg"
                      >
                        Reset Password
                      </Button>
                      {/* </Link> */}
                      {isLoading && <Loading />}
                      <Toast message={message} />
                    </CardFooter>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
          <Footer whiteFont />
        </div>
      </div>
    </>
  )

  // Loading Data... Please wait
}
