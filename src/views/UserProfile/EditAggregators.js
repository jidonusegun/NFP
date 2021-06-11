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
import { Formik } from 'formik';

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

  const { handleClose, setAggregator, aggregator  } = useContext(dataContext)
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("id");
  const userRole = localStorage.getItem("role");
// const { PatchAggregator } = useContext(dataContext)
const [result, setResult] = useState(aggregator[details?.index])

  async function sendToServer() {

    try {
      setIsLoading(true);
      const exclude = ['companyName',
        'itemsToSupply',
        'unitPrice',
        'phoneNumber',
        'frequencyOfSupply',
        'dayForConsumption',
        'numberOfPulpilFed',
        'bankName',
        'acctNumber',
        'tin',
        'state'];
      exclude.forEach((key) => {
        if (!addCook.values[key]) {
          setErrorMessage(`${key} is required`);
        }
      });

      const items = addCook.values.items;
      if (items && typeof items === 'string'){
        addCook.setData('items', items.split(','))
      };

      addCook.setData('registeredBy', userId)
      const tempData = {'tempData': JSON.stringify(addCook.values)};

      const {data} = await postContent(`${baseUrl}/aggregator/tempedit/${details._id}`, tempData, token);
      if(userRole === "SUPER_ADMIN") {
        alert('Record Added')
      }
      {
        alert('Record sent for approval')
      }
// content.unshift(data)
      setIsLoading(false);
      handleClose();
    } catch ({ message }) {
      alert(message);
    }
    finally {
      setIsLoading(false);
    }
  }

  const handleChangeState = (e) => {

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
        addCook.setDefault(result)
        getContent(`${baseUrl}/settings/states`, token)
        .then(data=>setStatevalue(data.data))

        getContent(`${baseUrl}/settings/state/${stateID}/lgas`, token)
        .then(data=>setLgavalue(data.data))

      },[token, stateID, result])

      // Aggregator's Company Name,
      // Items to Supply,
      // Unit Post,
      // Day for Consumption,
      // Number of Pupils,
      // Bank,
      // Acct. Number,
      // TIN
      
      const onChangeFunction = (e) => {
        setResult({[e.target.name]: e.target.value});
      }

  return (
    <div>
      <Formik
       initialValues={{ companyName: '', itemsToSupply: '', unitPrice: '', phoneNumber: '', frequencyOfSupply: '', dayForConsumption: '', numberOfPulpilFed: '', bankName: '', acctNumber: '', tin: '', state: '' }}

       validate={values => {
         const errors = {};
         if (!values.companyName) {
           errors.companyName = 'Required';
         }else if(typeof values.companyName !== "string") {
          errors.companyName = 'This input is not an alphabet';
         }

         if (!values.itemsToSupply) {
          errors.itemsToSupply = 'Required';
        }else if(typeof values.itemsToSupply !== "string") {
          errors.itemsToSupply = 'This input is not an alphabet';
         }

        if (!values.unitPrice) {
          errors.unitPrice = 'Required';
        } else if(!(isNaN(values.unitPrice))) {
          errors.unitPrice = 'This input is not a number';
         }

        if (!values.phoneNumber) {
          errors.phoneNumber = 'Required';
        }
        else if (values.phoneNumber.length > 11 || values.phoneNumber.length < 11) {
          errors.phoneNumber = 'Invalid Phone Number';
        }
        if (!values.frequencyOfSupply) {
          errors.frequencyOfSupply = 'Required';
        }

        if (!values.dayForConsumption) {
          errors.dayForConsumption = 'Required';
        }
        
        if (!values.numberOfDaysPerCycle) {
          errors.numberOfDaysPerCycle = 'Required';
        }

        if (!values.numberOfPulpilFed) {
          errors.numberOfPulpilFed = 'Required';
        }

        if (!values.bankName) {
          errors.bankName = 'Required';
        }

        if (!values.acctNumber) {
          errors.acctNumber = 'Required';
        } else if(values.acctNumber.length > 10 || values.acctNumber.length < 10) {
          errors.acctNumber = 'This input is not a number';
         }

        if (!values.tin) {
          errors.tin = 'Required';
        } 

        if (!values.state) {
          errors.state = 'Required';
        } 

         return errors;
       }}
       onSubmit={(values, { setSubmitting }) => {
        sendToServer()
       }}
     >
       {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
         /* and other goodies */ 
       }) => (
        <form onSubmit={handleSubmit}>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                {title ? title : "Add Aggregator's Data"}
              </h4>
              <p className={classes.cardCategoryWhite}>{subTitle}</p>
            </CardHeader>
            <CardBody>
              <div
                style={{ color: "red", textAlign: "center", width: "100%" }}
              >{`${errorMessage}`}</div>
              
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Company's Name"
                    id="companyName"
                    inputProps={{
                      type: "text",
                      name: "companyName",
                      onChange: (e) => {onChangeFunction(e); addCook.getData(e); handleChange(e)},
                      onBlur: handleBlur,
                      value: addCook.values.companyName,
                    }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                  {errors.companyName && touched.companyName && errors.companyName}
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                    labelText="Item(s) to supply"
                    id="itemsToSupply"
                    inputProps={{
                      type: "text",
                      name: "itemsToSupply",
                      onChange: (e) => {onChangeFunction(e); addCook.getData(e); handleChange(e)},
                      onBlur: handleBlur,
                      value: addCook.values.itemsToSupply,
                    }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                  {errors.itemsToSupply && touched.itemsToSupply && errors.itemsToSupply}
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                    labelText="Unit Price"
                    id="unitPrice"
                    inputProps={{
                      type: "number",
                      name: "unitPrice",
                      onChange: (e) => {onChangeFunction(e); addCook.getData(e); handleChange(e)},
                      onBlur: handleBlur,
                      value: addCook.values.unitPrice,
                    }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                  {errors.unitPrice && touched.unitPrice && errors.unitPrice}
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Day of Consumption"
                    id="dayForConsumption"
                    inputProps={{
                      type: "number",
                      name: "dayForConsumption",
                      onChange: (e) => {onChangeFunction(e); addCook.getData(e); handleChange(e)},
                      onBlur: handleBlur,
                      value: addCook.values.dayForConsumption,
                    }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                  {errors.dayForConsumption && touched.dayForConsumption && errors.dayForConsumption}
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Account No"
                    id="acctNumber"
                    inputProps={{
                      type: "number",
                      name: "acctNumber",
                      onChange: (e) => {onChangeFunction(e); addCook.getData(e); handleChange(e)},                     
                      onBlur: handleBlur,
                      value: addCook.values.acctNumber,
                    }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                  {errors.acctNumber && touched.acctNumber && errors.acctNumber}
                </GridItem>
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
                      onChange={(e) => {onChangeFunction(e); addCook.getData(e); handleChange(e)}}
                      onBlur={handleBlur}
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
                  {errors.bankName && touched.bankName && errors.bankName}
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="TIN"
                    id="tin"
                    inputProps={{
                      type: "number",
                      name: "tin",
                      onChange: (e) => {onChangeFunction(e); addCook.getData(e); handleChange(e)},
                      onBlur: handleBlur,
                      value: addCook.values.tin,
                    }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                  {errors.tin && touched.tin && errors.tin}
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="No. of pupils to feed"
                    id="numberOfPulpilFed"
                    inputProps={{
                      type: "number",
                      name: "numberOfPulpilFed",
                      onChange: (e) => {onChangeFunction(e); addCook.getData(e); handleChange(e)},
                      onBlur: handleBlur,
                      value: addCook.values.numberOfPulpilFed,
                    }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                  {errors.numberOfPulpilFed && touched.numberOfPulpilFed && errors.numberOfPulpilFed}
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Mobile Number"
                    id="phoneNumber"
                    inputProps={{
                      type: "tel",
                      name: "phoneNumber",
                      onChange: (e) => {onChangeFunction(e); addCook.getData(e); handleChange(e)},
                      onBlur: handleBlur,
                      value: addCook.values.phoneNumber,
                    }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                  {errors.phoneNumber && touched.phoneNumber && errors.phoneNumber}
                </GridItem>
                </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Frequently of Supply"
                    id="frequencyOfSupply"
                    inputProps={{
                      type: "number",
                      name: "frequencyOfSupply",
                      onChange: (e) => {onChangeFunction(e); addCook.getData(e); handleChange(e)},
                      onBlur: handleBlur,
                      value: addCook.values.frequencyOfSupply,
                    }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                  {errors.frequencyOfSupply && touched.frequencyOfSupply && errors.frequencyOfSupply}
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="No. of Days Per Cycle"
                    id="numberOfDaysPerCycle"
                    inputProps={{
                      type: "number",
                      name: "numberOfDaysPerCycle",
                      onChange: (e) => {onChangeFunction(e); addCook.getData(e); handleChange(e)},
                      onBlur: handleBlur,
                      value: addCook.values.numberOfDaysPerCycle,
                    }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                  {errors.numberOfDaysPerCycle && touched.numberOfDaysPerCycle && errors.numberOfDaysPerCycle}
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="state" style={{color: "#D2D2D2", fontWeight: "normal"}}>State</InputLabel>
                    <Select
                      native
                      value={addCook.values.state}
                      onChange={(e) =>{onChangeFunction(e); handleChangeState(e)
                        addCook.getData(e); handleChange(e)}}
                      onBlur={handleBlur}
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
                  {errors.state && touched.state && errors.state}
                  </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button type='submit' color="primary">
                {sendButton ? sendButton : "Submit"}
                {isLoading && <Loading />}
              </Button>
              <Toast message={message} />
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      </form>
      )}
    </Formik>
    </div>
  );
}
