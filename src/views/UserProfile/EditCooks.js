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
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { dataContext } from 'components/context/DataContext';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import {patchContent, getContent, postContent, postImageContent} from 'utils';
import loogos from "assets/img/loogos.png";
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

export default function EditCooks({title, subTitle, sendButton, details, content }) {
  const addCook = userForm(sendToServer);
  const classes = useStyles();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [stateValue, setStatevalue] = useState([])
  const [lgaValue, setLgavalue] = useState([])
  const [stateID, setStateID] = useState()
  const [imageUpload, setImageUpload] = useState({ image: "" });
  const [errorMessage, setErrorMessage] = useState("")
  const [schools, setSchools] = useState([]);
  // let errorMessage = "";
  const { handleClose } = useContext(dataContext)
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("id");
  const stateLogin = localStorage.getItem("state");
  const lgaLogin = localStorage.getItem("lga");
  const userRole = localStorage.getItem("role");
  const [result, setResult] = useState(details)
  const baseUrl = config.API_URL
// const { PatchCook } = useContext(dataContext)

const handleImageUpload = (e) => {
  setImageUpload({ image: e.target.files[0] });
};
  
  async function sendToServer() {
    try {
      setIsLoading(true);
      const imageData = new FormData();
      imageData.append("files", imageUpload?.image);

      const exclude = ['address','schoolName','lga','state','email','phoneNumber','bvn','bankName','accountNumber','birthday','gender','lastName','firstName',];
      exclude.forEach((key) => {
        if (!addCook.values[key]) {
          setErrorMessage(`${key} is required`);
        }
      });
      addCook.setData('registeredBy', userId)
      delete addCook.values.filePicker;
      delete addCook.values.files;
      const tempData = {'tempData': JSON.stringify(addCook.values)};
      const {data} = await postContent(`${baseUrl}/cook/tempedit/${details._id}`,
        tempData, token);

      if (imageUpload?.image) {
        const imageResult = await postImageContent(
          `${baseUrl}/cook/upload-image/${details?._id}`,
          imageData,
          token
        );
      }
// content.unshift(data)
if(userRole === "SUPER_ADMIN") {
  alert('Record Added')
}
{
  alert('Record sent for approval')
}
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

  const [imageFile, setImageFile] = useState({file: '',imagePreviewUrl: ''});

    const handleSubmit = (e) => {
        e.preventDefault();
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

      useEffect(() => {
        addCook.setDefault(details)
        getContent(`${baseUrl}/settings/states`, token)
        .then(data=>setStatevalue(data.data))

        getContent(`${baseUrl}/settings/state/${stateID}/lgas`, token)
        .then(data=>setLgavalue(data.data))

        getContent(
          `${baseUrl}/schools?state=${stateLogin}&lga=${lgaLogin}`,
          token
        ).then((data) => setSchools(data.data));

      },[token, stateID, stateLogin, lgaLogin, details])
  
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                {title ? title : "Add Cook's Data"}
              </h4>
              <p className={classes.cardCategoryWhite}>{subTitle}</p>
            </CardHeader>
            <CardBody>
              <div
                style={{ color: "red", textAlign: "center", width: "100%" }}
              >{`${errorMessage}`}</div>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CardAvatar profile style={{ marginTop: "2rem" }}>
                    <form>
                      <label htmlFor="filePickerEditCook">
                        <IconButton
                          color="primary"
                          style={{ margin: "0", padding: "0" }}
                          aria-label="upload picture"
                          component="span"
                        >
                          <div style={{ borderRadius: "50%", margin: "0" }}>
                            {$imagePreview}
                          </div>
                          <PhotoCamera className={classes.upload} />
                        </IconButton>
                      </label>
                      <input
                        id="filePickerEditCook"
                        style={{ visibility: "hidden" }}
                        type="file"
                        name="files"
                        className={classes.input}
                        // function(event){ addCook.getFile(); handleImageChange;}
                        onChange={(e) => {
                          handleImageUpload(e);
                          handleImageChange(e);
                        }}
                        accept="image/*"
                      />
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
                      defaultValue: addCook.values.firstName,
                      onChange: (e) => addCook.getData(e),
                    }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Middle Name"
                    id="middleName"
                    inputProps={{
                      type: "text",
                      name: "middleName",
                      onChange: (e) => addCook.getData(e),
                    }}
                    formControlProps={{
                      fullWidth: true,
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
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControl className={classes.formControl}>
                    <InputLabel
                      htmlFor="gender"
                      style={{ color: "#D2D2D2", fontWeight: "normal" }}
                    >
                      Gender
                    </InputLabel>
                    <Select
                      native
                      value={addCook.values.gender}
                      onChange={addCook.getData}
                      className={classes.underline}
                      style={{ width: "100%" }}
                      inputProps={{
                        name: "gender",
                        id: "gender",
                      }}
                    >
                      <option aria-label="None" value="" />
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </Select>
                  </FormControl>
                </GridItem>
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
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                <FormControl className={classes.formControl}>
                    <InputLabel
                      htmlFor="bankName"
                      style={{ color: "#D2D2D2", fontWeight: "normal" }}
                    >
                      Bank Name
                    </InputLabel>
                    <Select
                      native
                      value={addCook.values.bankName}
                      onChange={addCook.getData}
                      className={classes.underline}
                      style={{ width: "100%" }}
                      inputProps={{
                        name: "bankName",
                        id: "bankName",
                      }}
                    >
                      <option aria-label="None" value="" />
                      <option value="Access Bank Plc">Access Bank Plc</option>
                      <option value="Fidelity Bank Plc">Fidelity Bank Plc</option>
                      <option value="First City Monument Bank Limited">First City Monument Bank Limited</option>
                      <option value="First Bank of Nigeria Limited">First Bank of Nigeria Limited</option>
                      <option value="Guaranty Trust Bank Plc">Guaranty Trust Bank Plc</option>
                      <option value="Union Bank of Nigeria Plc">Union Bank of Nigeria Plc</option>
                      <option value="United Bank for Africa Plc">United Bank for Africa Plc</option>
                      <option value="Zenith Bank Plc">Zenith Bank Plc</option>
                      <option value="Citibank Nigeria Limited">Citibank Nigeria Limited</option>
                      <option value="Ecobank Nigeria">Ecobank Nigeria</option>
                      <option value="Heritage Bank Plc">Heritage Bank Plc</option>
                      <option value="Keystone Bank Limited">Keystone Bank Limited</option>
                      <option value="Polaris Bank Limited">Polaris Bank Limited.</option>
                      <option value="Stanbic IBTC Bank Plc">Stanbic IBTC Bank Plc</option>
                      <option value="Standard Chartered">Standard Chartered</option>
                      <option value="Sterling Bank Plc">Sterling Bank Plc</option>
                      <option value="Titan Trust Bank Limited">Titan Trust Bank Limited</option>
                      <option value="Unity Bank Plc">Unity Bank Plc</option>
                      <option value="Wema Bank Plc">Wema Bank Plc</option>
                      <option value="Globus Bank Limited[3]">Globus Bank Limited[3]</option>
                      <option value="SunTrust Bank Nigeria Limited">SunTrust Bank Nigeria Limited</option>
                      <option value="Providus Bank Limited">Providus Bank Limited</option>
                      <option value="Jaiz Bank Plc">Jaiz Bank Plc</option>
                      <option value="TAJBank Limited">TAJBank Limited</option>
                      <option value="Mutual Trust Microfinance Bank">Mutual Trust Microfinance Bank</option>
                      <option value="Finca Microfinance Bank Limited">Finca Microfinance Bank Limited</option>
                      <option value="Fina Trust Microfinance Bank">Fina Trust Microfinance Bank</option>
                      <option value="Accion Microfinance Bank">Accion Microfinance Bank</option>
                      <option value="Peace Microfinance Bank">Peace Microfinance Bank</option>
                      <option value="Infinity Microfinance Bank">Infinity Microfinance Bank</option>
                      <option value="Kuda Bank">Kuda Bank</option>
                      <option value="Rubies Bank">Rubies Bank</option>
                      <option value="VFD MFB">VFD MFB</option>
                      <option value="Mint Finex MFB">Mint Finex MFB</option>
                      <option value="Mkobo MFB">Mkobo MFB</option>
                      <option value="Coronation Merchant Bank[6]">Coronation Merchant Bank[6]</option>
                      <option value="FBNQuest Merchant Bank[7]">FBNQuest Merchant Bank[7]</option>
                      <option value="FSDH Merchant Bank[8]">FSDH Merchant Bank[8]</option>
                      <option value="Rand Merchant Bank">Rand Merchant Bank</option>
                      <option value="Nova Merchant Bank">Nova Merchant Bank</option>
                    </Select>
                  </FormControl>
                </GridItem>
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
                      fullWidth: true,
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
                      fullWidth: true,
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
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="No. of Pulpil(s) to Feed"
                    id="numberOfPulpilFed"
                    inputProps={{
                      type: "number",
                      name: "numberOfPulpilFed",
                      onChange: (e) => addCook.getData(e),
                    }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="No. of Days Per Cycle"
                    id="numberOfDaysPerCycle"
                    inputProps={{
                      type: "number",
                      name: "numberOfDaysPerCycle",
                      onChange: (e) => addCook.getData(e),
                    }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Amount Per Meal"
                    id="amountPerMeal"
                    inputProps={{
                      type: "email",
                      name: "amountPerMeal",
                      onChange: (e) => addCook.getData(e),
                    }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControl className={classes.formControl}>
                    <InputLabel
                      htmlFor="state"
                      style={{ color: "#D2D2D2", fontWeight: "normal" }}
                    >
                      State
                    </InputLabel>
                    <Select
                      native
                      value={addCook.values.state}
                      onChange={(e) => {
                        handleChange(e);
                        addCook.getData(e);
                      }}
                      className={classes.underline}
                      style={{ width: "100%" }}
                      inputProps={{
                        name: "state",
                        id: "state",
                      }}
                    >
                      <option aria-label="None" value="" />
                      {stateValue.map(({ _id, name }) => {
                        return (
                          <option value={name} id={_id}>
                            {name}
                          </option>
                        );
                      })}
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControl className={classes.formControl}>
                    <InputLabel
                      htmlFor="lga"
                      style={{ color: "#D2D2D2", fontWeight: "normal" }}
                    >
                      LGA
                    </InputLabel>
                    <Select
                      native
                      value={addCook.values.lga}
                      onChange={addCook.getData}
                      className={classes.underline}
                      style={{ width: "100%" }}
                      inputProps={{
                        name: "lga",
                        id: "lga",
                      }}
                    >
                      <option aria-label="None" value="" />
                      {lgaValue.map((lga) => {
                        return <option value={lga}>{lga}</option>;
                      })}
                    </Select>
                  </FormControl>
                </GridItem>
                </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControl className={classes.formControl}>
                    <InputLabel
                      htmlFor="schoolName"
                      style={{ color: "#D2D2D2", fontWeight: "normal" }}
                    >
                      School Name
                    </InputLabel>
                    <Select
                      native
                      value={addCook.values.schoolName}
                      onChange={addCook.getData}
                      className={classes.underline}
                      style={{ width: "100%" }}
                      inputProps={{
                        name: "schoolName",
                        id: "schoolName",
                      }}
                    >
                      <option aria-label="None" value="" />
                      {schools.map((schoolName) => {
                        return <option value={schoolName.name}>{schoolName.name}</option>;
                      })}
                    </Select>
                  </FormControl>
                </GridItem>
              </GridContainer>
              {/* <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Number of pupils to feed"
                    id="pupilFeed"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "number",
                      name: "pupilFeed",
                      onChange: (e) => addCook.getData(e),
                    }}
                  />
                </GridItem>
              </GridContainer> */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  {/* <InputLabel style={{ color: "#AAAAAA" }}>Address</InputLabel> */}
                  <CustomInput
                    labelText="Address"
                    id="address"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 3,
                      type: "text",
                      name: "address",
                      onChange: (e) => addCook.getData(e),
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button onClick={addCook.submit} color="primary">
                {sendButton ? sendButton : "Submit"}
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
