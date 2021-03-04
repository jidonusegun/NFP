import React, {useState, useContext, useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { dataContext } from 'components/context/DataContext';
import CardAvatar from "components/Card/CardAvatar.js";
import {postContent, getContent} from 'utils';
import loogos from "assets/img/loogos.png";
import userForm from "../../hooks/useForm";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  }, 
  input: {
    display: 'none',
    top: "4rem",
  },
  upload: {
    position: "absolute",
    top: "5rem",
    fontSize: "2rem",
  },
  img: {
    maxWidth: "200px",
    maxHeight: "180px",
  },
  formControl: {
    width: "100%",
    marginTop: "1.8rem",
  },
  selectEmpty: {
    marginTop: "2rem",
  },
  underline: {
    "&:hover:not($disabled):before,&:before": {
      borderColor: "#D2D2D2 !important",
      borderWidth: "1px !important"
    },
    "&:after": {
      borderColor: "#9c27b0"
    }
  },
};

const useStyles = makeStyles(styles);

export default function UserProfile({title, subTitle, sendButton}) {
  const addUser = userForm(sendToServer);
  const classes = useStyles();

  const { handleClose } = useContext(dataContext)
  var token = localStorage.getItem("token");

  const [stateValue, setStatevalue] = useState([])
  const [lgaValue, setLgavalue] = useState([])
  const [stateID, setStateID] = useState()
  const [errorMessage, setErrorMessage] = useState("")

  // let errorMessage = "";

  useEffect(() => {
    getContent("https://nsfp.herokuapp.com/v1/settings/states", token)
    .then(data=>setStatevalue(data.data))

    getContent(`https://nsfp.herokuapp.com/v1/settings/state/${stateID}/lgas`, token)
    .then(data=>setLgavalue(data.data))
  },[token, stateID])

  console.log(stateID)
  // console.log(addUser.id.state)
    

  async function sendToServer() {

    if(!addUser.values.firstName) {
      setErrorMessage("First name is required")
    }
    else if(!addUser.values.lastName) {
      setErrorMessage("Last name is required")
    }
    else if(!addUser.values.gender) {
      setErrorMessage("Gender is required")
    }
    else if(!addUser.values.birthday) {
      setErrorMessage("Date of birth is required")
    }
    else if(!addUser.values.phoneNumber) {
      setErrorMessage("Phone number is required")
    }
    else if(!addUser.values.email) {
      setErrorMessage("Email is required")
    }
    else if(!addUser.values.username) {
      setErrorMessage("Username is required")
    }
    else if(!addUser.values.password) {
      setErrorMessage("Password is required")
    }
    else if(!addUser.values.role) {
      setErrorMessage("Role is required")
    }
    else if(!addUser.values.state) {
      setErrorMessage("State is required")
    }
    else if(!addUser.values.lga) {
      setErrorMessage("Lga is required")
    }
    else if(!addUser.values.address) {
      setErrorMessage("Address is required")
    }
    try {
      const response = await postContent("https://nsfp.herokuapp.com/v1/admin", addUser.values, token);
      console.log(response);
      handleClose();
    }
    catch(err) {
      setErrorMessage(err)
    }
  }


  const handleChange = (e) => {

    var index = e.target.selectedIndex;
    var optionElement = e.target.childNodes[index]
    var option =  optionElement.getAttribute('id');

    setStateID(option)
  }

  const [imageFile, setImageFile] = useState({file: '',imagePreviewUrl: ''});

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('handle uploading-', imageFile.file);
      }

      const handleImageChange = (e) => {
        e.preventDefault();
    
        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
          setImageFile({
            file: file,
            imagePreviewUrl: reader.result
          });
        }
    
        reader.readAsDataURL(file)
      }

      let {imagePreviewUrl} = imageFile
      let $imagePreview = null;
      if (imagePreviewUrl) {
        $imagePreview = (<img src={imagePreviewUrl} alt="upload" className={classes.img} />);
      } else {
        $imagePreview = (<div className="previewText" style={{borderRadius: "50%", margin: "0"}}><img src={loogos} alt="logo" /></div>);
      }
  
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>{title ? title : "Edit Data"}</h4>
              <p className={classes.cardCategoryWhite}>{subTitle}</p>
            </CardHeader>
            <CardBody>
            <div style={{color: "red", textAlign: "center", width: "100%"}}>{`${errorMessage}`}</div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                <CardAvatar profile style={{marginTop: "2rem"}}>
                  <form onSubmit={handleSubmit}>
                    <label htmlFor="filePicker">
                      <IconButton color="primary"  style={{margin: "0", padding: "0"}} aria-label="upload picture" component="span">
                        <div style={{borderRadius: "50%", margin: "0"}}>
                          {$imagePreview}
                        </div>
                      <PhotoCamera className={classes.upload} />
                      </IconButton>
                    </label>
                    <input id="filePicker" style={{visibility:"hidden"}} 
                      type="file" name="uploadPicture"  className={classes.input}
                      onChange={(e)=>{
                        // addUser.getFile(e)
                        handleImageChange(e)
                      }} accept="image/*" />
                  </form>
                </CardAvatar>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="First Name"
                    id="firstName"
                    inputProps={{
                      type: "text",
                      name: "firstName",
                      onChange: (e) => addUser.getData(e),
                    }}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Last Name"
                    id="lastName"
                    inputProps={{
                      type: "text",
                      name: "lastName",
                      onChange: (e) => addUser.getData(e),
                    }}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="gender" style={{color: "#D2D2D2", fontWeight: "normal"}}>Gender</InputLabel>
                    <Select
                      native
                      value={addUser.values.gender}
                      onChange={addUser.getData}
                      className={classes.underline}
                      style={{width: "100%"}}
                      inputProps={{
                        name: 'gender',
                        id: 'gender',
                      }}
                    >
                      <option aria-label="None" value="" />
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </Select>
                  </FormControl>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Phone Number"
                    id="phoneNumber"
                    inputProps={{
                      type: "number",
                      name: "phoneNumber",
                      onChange: (e) => addUser.getData(e),
                    }}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Email"
                    id="email"
                    inputProps={{
                      type: "email",
                      name: "emails",
                      onChange: (e) => addUser.getData(e),
                    }}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Date of Birth"
                    id="birthday"
                    inputProps={{
                      type: "date",
                      name: "dateOfBirth",
                      onChange: (e) => addUser.getData(e),
                    }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                </GridContainer>
                <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="state" style={{color: "#D2D2D2", fontWeight: "normal"}}>State</InputLabel>
                    <Select
                      native
                      value={addUser.values.state}
                      onChange={(e) =>{handleChange(e)
                        addUser.getData(e)}}
                      className={classes.underline}
                      style={{width: "100%"}}
                      inputProps={{
                        name: 'state',
                        id: 'state',
                      }}
                    >
                      <option aria-label="None" value="" />
                      {stateValue.map(({name, _id}) => {
                        return <option value={name} id={_id} key={_id}>{name}</option>
                      })}
                    </Select>
                  </FormControl> 
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="lga" style={{color: "#D2D2D2", fontWeight: "normal"}}>LGA</InputLabel>
                    <Select
                      native
                      value={addUser.values.lga}
                      onChange={addUser.getData}
                      className={classes.underline}
                      style={{width: "100%"}}
                      inputProps={{
                        name: 'lga',
                        id: 'lga',
                      }}
                    >
                      <option aria-label="None" value="" />
                      {lgaValue.map(lga => {
                        return <option value={lga}>{lga}</option>
                      })}
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Username"
                    id="username"
                    inputProps={{
                      type: "text",
                      name: "usernames",
                      onChange: (e) => addUser.getData(e),
                  }}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Password"
                    id="password"
                    inputProps={{
                        type: "password",
                        name: "passwords",
                      onChange: (e) => addUser.getData(e),
                    }}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="role" style={{color: "#D2D2D2", fontWeight: "normal"}}>Role</InputLabel>
                    <Select
                      native
                      value={addUser.values.role}
                      onChange={addUser.getData}
                      className={classes.underline}
                      style={{width: "100%"}}
                      inputProps={{
                        name: 'role',
                        id: 'role',
                      }}
                    >
                      <option aria-label="None" value="" />
                      <option value="SUPER_ADMIN">Super Admin</option>
                      <option value="ADMIN">Admin</option>
                    </Select>
                  </FormControl>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  {/* <InputLabel style={{ color: "#AAAAAA" }}>Address</InputLabel> */}
                  <CustomInput
                    labelText="Address"
                    id="address"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 3,
                      type: "text",
                      name: "addressd",
                      onChange: (e) => addUser.getData(e),
                    }}
                  />
                </GridItem>
              </GridContainer>
               
            </CardBody>
            <CardFooter>
              <Button onClick={addUser.submit}color="primary">{sendButton ? sendButton : "Edit Profile"}</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
