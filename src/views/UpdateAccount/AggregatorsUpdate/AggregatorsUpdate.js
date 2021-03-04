import React, {useState, useContext, useEffect} from 'react';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { dataContext } from 'components/context/DataContext';
import {patchContent, getContent} from 'utils';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { makeStyles } from "@material-ui/core/styles";
import userForm from "../../hooks/useForm";

const useStyles = makeStyles((theme) => ({
    imgPreview: {
        width: "200px",
        height: "180px",
        border: "1px solid gray",
    },
    fileInput: {
      fontSize: "3rem",
      position: "absolute",
      top: "-7rem",
      left: "5rem",
    },
    img: {
      maxWidth: "200px",
      maxHeight: "180px",
    },
    formControl: {
      width: "100%",
    },
    formControl: {
      width: "100%",
      marginTop: "1.8rem",
    },
    formControl: {
      width: "100%",
      marginTop: "1.8rem",
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
}))

export default function UpdateAdmin({details}) {
  const addCook = userForm(sendToServer);
    const classes = useStyles();
    // const { token } = useContext(dataContext)
    const [stateValue, setStatevalue] = useState([])
  const [lgaValue, setLgavalue] = useState([])
  const [stateID, setStateID] = useState()
    const token = localStorage.getItem("token");
    const [errorMessage, setErrorMessage] = useState("")
    // let errorMessage = "";

    async function sendToServer() {
      // console.log(addCook.values);
      // console.log(addCook.formData());
      if(!addCook.values.firstName) {
        setErrorMessage("First name is required")
      }
      else if(!addCook.values.lastName) {
        setErrorMessage("Last name is required")
      }
      else if(!addCook.values.gender) {
        setErrorMessage("Gender is required")
      }
      else if(!addCook.values.birthday) {
        setErrorMessage("Date of birth is required")
      }
      else if(!addCook.values.accountNumber) {
        setErrorMessage("Account number is required")
      }
      else if(!addCook.values.bankName) {
        setErrorMessage("Bank name is required")
      }
      else if(!addCook.values.bvn) {
        setErrorMessage("Bvn is required")
      }
      else if(!addCook.values.phoneNumber) {
        setErrorMessage("Phone number is required")
      }
      else if(!addCook.values.items) {
        setErrorMessage("Items is required")
      }
      else if(!addCook.values.email) {
        setErrorMessage("Email is required")
      }
      else if(!addCook.values.state) {
        setErrorMessage("State is required")
      }
      else if(!addCook.values.lga) {
        setErrorMessage("Lga is required")
      }
      else if(!addCook.values.schoolName) {
        setErrorMessage("School name is required")
      }
      else if(!addCook.values.address) {
        setErrorMessage("Address is required")
      }
      const value = addCook.values.items.split(',')
      addCook.values.items = value;
      
      try {
        patchContent(`https://nsfp.herokuapp.com/v1/aggregator/${details._id}`, addCook.values, token);
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

      let {imagePreviewUrl} = imageFile;
      let $imagePreview = null;
      if (imagePreviewUrl) {
        $imagePreview = (<img src={imagePreviewUrl} alt="upload" className={classes.img} />);
      } else {
        $imagePreview = (<div className="previewText"></div>);
      }


  useEffect(() => {
    getContent("https://nsfp.herokuapp.com/v1/settings/states", token)
    .then(data=>setStatevalue(data.data))


    getContent(`https://nsfp.herokuapp.com/v1/settings/state/${stateID}/lgas`, token)
    .then(data=>setLgavalue(data.data))

  },[token, stateID])

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
                    addCook.getFile(e)
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
                  {lgaValue.map(({name}) => {
                    return <option value={name}>{name}</option>
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
          <Button onClick={addCook.submit} color="primary">{sendButton ? sendButton : "Edit Profile"}</Button>
        </CardFooter>
      </Card>
    </GridItem>
  </GridContainer>
</div>
);
}
