import React, {useState, useContext} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
// React Router
import { Redirect, Link } from 'react-router-dom';
// @material-ui/icons
import People from "@material-ui/icons/People";
import LockOpenIcon from '@material-ui/icons/LockOpen';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// core components
import {postContent, postContentLogin} from '../../utils';
import { dataContext } from 'components/context/DataContext';
import DialogSuspend from 'components/Dialog/DialogSuspend.js';
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
import CircularProgress from '@material-ui/core/CircularProgress';

  const useStyles = makeStyles(styles);

  

export default function LoginPage(props) {
  const addCook = userForm(sendToServer);
  const addLogin = userForm(sendLoginToServer);
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [validate, setValidate] = useState(false)
  const [passwordCheck, setPasswordCheck] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false)

  const { handleClickOpenSuspend, handleCloseSuspend, setToken } = useContext(dataContext);

  var token = localStorage.getItem("token");

  async function sendToServer() {
    // console.log(addCook.values);
    if(addCook.values !== "") {
      setPasswordCheck(true);
    }
    handleCloseSuspend();
  const response = await postContent("/api/cooks/add_one/cook.php", addCook.values, token);
  // addCook.reset();
    const body = await response;
    console.log(body);
  }


  async function sendLoginToServer() {
    setLoading(true);
  const response = await postContentLogin("https://nsfp.herokuapp.com/v1/admin/login", addLogin.values);

  const body = await response

    setToken(body.data.token)

    localStorage.setItem("token", body.data.token)
    localStorage.setItem("state", body.data.state)
    localStorage.setItem("lga", body.data.lga)
    localStorage.setItem("id", body.data._id)
    
    if (body.success === true && body.data.role === "SUPER_ADMIN") {
        setLoggedIn(true);
    }
    else {
      setValidate(true)
    }

    setLoading(false);
  }



  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;


  

  // const handleChange = (e) => {
  //   setUser({...user, [e.target.name]: e.target.value})
  // }

  

// const auth = async () => {
//   setLoading(true);
//         const formData = new FormData();
//         formData.append('email', user.username);
//         formData.append('password', user.password);

//     const result = await postContent(`/api/users/authenticate/user.php`,formData);

//   const body = await result
//   console.log(body);

//   setToken(body.jwt)

//   // if (body.length === 0) {
//   //   setIfResult(true)
//   // }
  
//   if (parseInt(body.status) === 3) {
//       setLoggedIn(true);
//   }
//   else {
//     setValidate(true)
//   }

//   setUser({
//     username: '',
//     password: ''
//   })
// }

  return (
    <>
      <DialogSuspend fullWidth title="Retrieve your password" children={
        <CustomInput
            labelText="Enter your email"
            id="forgot-password"
            inputProps={{
              type: "text",
              name: "forgotPassword",
              onChange: (e) => addCook.getData(e),
            }}
            formControlProps={{
            fullWidth: true
            }}
        />
    } noButton="Cancel" yesButton="Send" handleSuspend={addCook.submit}  />

    {loggedIn ? <Redirect to="/admin/home" /> : null}
      <div>
      <Header
        absolute
        color="transparent"
        brand="NSFRS"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
         {/* onSubmit={formik.handleSubmit}  */}
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Federal Admin Login</h4>
                  </CardHeader>
                    <div className={classes.federalLogin}>Or login as a <Link to="/login-page">State Admin</Link></div>
                  <CardBody>
                    <div className={validate ? classes.dBlock : classes.dNone}>Incorrect username or password</div>
                    
                    <div className={passwordCheck ? classes.dBlockPassword : classes.dNone}>Check your email to get your password </div>
                      <CustomInput
                        labelText="Username"
                        id="username"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          name: "usernames",
                          onChange: (e) => addLogin.getData(e),
                          value: addLogin.values.username,
                          endAdornment: (
                            <InputAdornment position="end">
                              <People className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
                      <CustomInput
                        labelText="Password"
                        id="password"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "password",
                          name: "password",
                          onChange: (e) => addLogin.getData(e),
                          value: addLogin.values.password,
                          endAdornment: (
                            <InputAdornment position="end">
                              <LockOpenIcon className={classes.inputIconsColor} />
                            </InputAdornment>
                          ),
                          autoComplete: "off"
                        }}
                      />
                    {/* </form> */}
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                   {/* <Link to="/state-admin/home">  */}
                      <Button type="submit" onClick={addLogin.submit} simple color="primary" size="lg">
                        Login
                      </Button>
                    {/* </Link> */}
                    {loading ? <CircularProgress size={20} /> : null}
                    
                  </CardFooter>
                  <div className={classes.forgotPasswordContainer}>Forgotten Password? <span onClick={handleClickOpenSuspend} className={classes.forgotPassword}>Click here</span></div>
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
