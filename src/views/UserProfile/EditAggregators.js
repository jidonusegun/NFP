import React, {useState, useContext, useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
// import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
// import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { dataContext } from 'components/context/DataContext';
// import PhotoCamera from '@material-ui/icons/PhotoCamera';
import {patchContent, getContent, postContent, postImageContent} from 'utils';
// import loogos from "assets/img/loogos.png"; 
import userForm from "../../hooks/useForm";
import Loading from "components/isLoading";
import Toast from "components/toast";
import config from 'utils/config';

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

export default function EditAggregator({title, subTitle, sendButton, details, content}) {
  const addCook = userForm(sendToServer);
  const classes = useStyles();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [stateValue, setStatevalue] = useState([])
  const [lgaValue, setLgavalue] = useState([])
  const [stateID, setStateID] = useState()
  const [errorMessage, setErrorMessage] = useState("")
  const baseUrl = config.API_URL
  // let errorMessage = "";

  const { handleClose } = useContext(dataContext)
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("id");
// const { PatchAggregator } = useContext(dataContext)

  async function sendToServer() {

    try {
      setIsLoading(true);
      const exclude = ['address','schoolName','lga','state','email','items','phoneNumber','bvn','bankName','accountNumber','birthday','gender','lastName','firstName',];
      exclude.forEach((key) => {
        if (!addCook.values[key]) {
          setErrorMessage(`${key} is required`);
        }
      });

      const value = addCook.values.items.split(",");
      addCook.values.items = value;

      addCook.setData('registeredBy', userId)

      const {data} = await patchContent(`${baseUrl}/aggregator/${details._id}`, addCook.values, token);
      setMessage('Record sent for approval')
content.unshift(data)
      setIsLoading(false);
      handleClose();
    } catch ({ message }) {
      alert(message);
    }
    finally {
      setIsLoading(false);
    }
  }

  const handleChange = (e) => {

    var index = e.target.selectedIndex;
    var optionElement = e.target.childNodes[index]
    var option =  optionElement.getAttribute('id');

    setStateID(option)
  }

  // const [imageFile, setImageFile] = useState({file: '',imagePreviewUrl: ''});

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log('handle uploading-', imageFile.file);
    //   }

    //   const handleImageChange = (e) => {
    //     e.preventDefault();
    
    //     let reader = new FileReader();
    //     let file = e.target.files[0];
    
    //     reader.onloadend = () => {
    //       setImageFile({
    //         file: file,
    //         imagePreviewUrl: reader.result
    //       });
    //     }
    
    //     reader.readAsDataURL(file)
    //   }

      // let {imagePreviewUrl} = imageFile
      // let $imagePreview = null;
      // if (imagePreviewUrl) {
      //   $imagePreview = (<img src={imagePreviewUrl} alt="upload" className={classes.img} />);
      // } else {
      //   $imagePreview = (<div className="previewText" style={{borderRadius: "50%", margin: "0"}}><img src={loogos} alt="logo" /></div>);
      // }

      useEffect(() => {
        getContent("https://nsfp.herokuapp.com/v1/settings/states", token)
        .then(data=>setStatevalue(data.data))

        getContent(`https://nsfp.herokuapp.com/v1/settings/state/${stateID}/lgas`, token)
        .then(data=>setLgavalue(data.data))

      },[token, stateID])

      // Aggregator's Company Name,
      // Items to Supply,
      // Unit Post,
      // Day for Consumption,
      // Number of Pupils,
      // Bank,
      // Acct. Number,
      // TIN
   
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>{title ? title : "Edit Aggregator's Data"}</h4>
              <p className={classes.cardCategoryWhite}>{subTitle}</p>
            </CardHeader>
            <CardBody>
            <div style={{color: "red", textAlign: "center", width: "100%"}}>{`${errorMessage}`}</div>
            {/* <GridContainer>
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
                        addCook.getFile(e)
                        handleImageChange(e)
                      }} accept="image/*" />
                  </form>
                </CardAvatar>
                </GridItem>
              </GridContainer> */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="First Name"
                    id="firstName"
                    inputProps={{
                      type: "text",
                      name: "firstName",
                      onChange: (e) => addCook.getData(e),
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
                      onChange: (e) => addCook.getData(e),
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
                      value={addCook.values.gender}
                      onChange={addCook.getData}
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
                    labelText="Date of Birth"
                    id="birthday"
                    inputProps={{
                      type: "date",
                      name: "dateOfBirth",
                      onChange: (e) => addCook.getData(e),
                    }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Account No"
                    id="accountNumber"
                    inputProps={{
                      type: "number",
                      name: "accountNo",
                      onChange: (e) => addCook.getData(e),
                    }}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Bank Name"
                    id="bankName"
                    inputProps={{
                      type: "text",
                      name: "bankName",
                      onChange: (e) => addCook.getData(e),
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
                    labelText="BVN"
                    id="bvn"
                    inputProps={{
                      type: "number",
                      name: "bvns",
                      onChange: (e) => addCook.getData(e),
                    }}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Mobile Number"
                    id="phoneNumber"
                    inputProps={{
                      type: "number",
                      name: "mobileNumber",
                      onChange: (e) => addCook.getData(e),
                    }}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Item(s)"
                    id="items"
                    inputProps={{
                      type: "text",
                      name: "items",
                      onChange: (e) => addCook.getData(e),
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
                    labelText="Email"
                    id="email"
                    inputProps={{
                      type: "email",
                      name: "emails",
                      onChange: (e) => addCook.getData(e),
                    }}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="state" style={{color: "#D2D2D2", fontWeight: "normal"}}>State</InputLabel>
                    <Select
                      native
                      value={addCook.values.state}
                      onChange={(e) =>{handleChange(e)
                        addCook.getData(e)}}
                      className={classes.underline}
                      style={{width: "100%"}}
                      inputProps={{
                        name: 'state',
                        id: 'state',
                      }}
                    >
                      <option aria-label="None" value="" />
                      {stateValue.map(({name, _id}) => {
                        return <option value={name} id={_id}>{name}</option>
                      })}
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="lga" style={{color: "#D2D2D2", fontWeight: "normal"}}>LGA</InputLabel>
                    <Select
                      native
                      value={addCook.values.lga}
                      onChange={addCook.getData}
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
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="School Name"
                    id="schoolName"
                    inputProps={{
                      type: "text",
                      name: "schoolName",
                      onChange: (e) => addCook.getData(e),
                    }}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
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
                      onChange: (e) => addCook.getData(e),
                    }}
                  />
                </GridItem>
              </GridContainer>
              </CardBody>
            <CardFooter>
              <Button onClick={addCook.submit} color="primary">
                {sendButton ? sendButton : "Edit Profile"}
                {isLoading && <Loading />}
                </Button>
                <Toast message={message} />
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
