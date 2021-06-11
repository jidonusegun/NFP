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
import {patchContent, getContent, postContent, postImageContent} from 'utils';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { makeStyles } from "@material-ui/core/styles";
import userForm from "../../hooks/useForm";
import Loading from "components/isLoading";
import Toast from "components/toast";
import config from 'utils/config';
import {Formik} from 'formik'
const loogos = '/media/img/nsfr.png'

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

export default function UpdateAdmin({details, content}) {
  const addCook = userForm(sendToServer);
    const classes = useStyles();
    const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
    const [stateValue, setStatevalue] = useState([])
  const [lgaValue, setLgavalue] = useState([])
  const [stateID, setStateID] = useState()
  const [imageUpload, setImageUpload] = useState({ image: "" });
  const [errorMessage, setErrorMessage] = useState("")
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("id");
    const baseUrl = config.API_URL

    useEffect(() => {
      
      getContent(`${baseUrl}/settings/states`, token)
      .then(data=>setStatevalue(data.data))
  
  
      getContent(`${baseUrl}/settings/state/${stateID}/lgas`, token)
  .then(data=>setLgavalue(data.data))

},[token, stateID])

    const handleImageUpload = (e) => {
      setImageUpload({ image: e.target.files[0] });
    };

    async function sendToServer() {
      try {
        setIsLoading(true);
        const imageData = new FormData();
        imageData.append("files", imageUpload?.image);

        const exclude = ["address",
        "lga",
        "state",
        "totalPulpil",
        "email",
        "phoneNumber",
        "contactPerson",
        "name",];
      exclude.forEach((key) => {
        if (!addCook.values[key]) {
          setErrorMessage(`${key} is required`);
        }
      });
      addCook.setData('registeredBy', userId)
      delete addCook.values.filePicker;
      delete addCook.values.files;
      const tempData = {'tempData': JSON.stringify(addCook.values)};
        const {data} = await postContent(`${baseUrl}/school/tempedit/${details._id}`,
        tempData, token);

          if (imageUpload?.image) {
        const imageResult = await postImageContent(
          `${baseUrl}/cook/upload-image/${details?._id}`,
          imageData,
          token
        );
      }
    // content.unshift(data)
    alert('Edit Record sent for approval')
      // console.log(result);
      setIsLoading(false)
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

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log('handle uploading-', imageFile.file);
      }

      const [imageFile, setImageFile] = useState({ file: "", imagePreviewUrl: "" });

  const handleImageChange = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setImageFile({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);
  };

  let { imagePreviewUrl } = imageFile;
  let $imagePreview = null;
  if (imagePreviewUrl) {
    $imagePreview = (
      <img src={imagePreviewUrl} alt="upload" className={classes.img} />
    );
  } else {
    $imagePreview = (
      <div className="previewText" style={{ borderRadius: "50%", margin: "0" }}>
        <img src={loogos} alt="logo" />
      </div>
    );
  }

    return (
      <div>
      <Formik
       initialValues={{ 
        address: '',
       lga: '',
       state: '',
       email: '',
       phoneNumber: '',
       name: '',
       contactPerson: '',
       totalPulpil: '',
      }}

       validate={values => {
         const errors = {};
         if (!values.address) {
           errors.address = 'Required';
         }

        if (!values.lga) {
          errors.lga = 'Required';
        } 

        if (!values.state) {
          errors.state = 'Required';
        }
        if (!values.email) {
          errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
          errors.email = 'Invalid email address';
        }

        if (!values.phoneNumber) {
          errors.phoneNumber = 'Required';
        } else if (values.phoneNumber.length > 11 || values.phoneNumber.length < 11 ) {
          errors.phoneNumber = 'Invalid Phone Number';
        }
        
        if (!values.name) {
          errors.name = 'Required';
        }

        if (!values.contactPerson) {
          errors.contactPerson = 'Required';
        }
        if (!values.totalPulpil) {
          errors.totalPulpil = 'Required';
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
              <h4 className={classes.cardTitleWhite}>{title}</h4>
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
                      <label htmlFor="filePickerSchool">
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
                        id="filePickerSchool"
                        style={{ visibility: "hidden" }}
                        type="file"
                        name="uploadPicture"
                        className={classes.input}
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
                    labelText="School Name"
                    id="name"
                    inputProps={{
                      type: "text",
                      name: "name",
                      onChange: (e) => {handleChange(e); addCook.getData(e)},
                      onBlur: handleBlur
                    }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                  <div style={{color: 'red'}}>
                  {errors.name && touched.name && errors.name}
                    </div>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Contact Person"
                    id="contactPerson"
                    inputProps={{
                      type: "text",
                      name: "contactPerson",
                      onChange: (e) => {handleChange(e); addCook.getData(e)},
                      onBlur: handleBlur
                    }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                  <div style={{color: 'red'}}>
                  {errors.contactPerson && touched.contactPerson && errors.contactPerson}
                    </div>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Contact Phone No"
                    id="phoneNumber"
                    inputProps={{
                      type: "tel",
                      name: "phoneNumber",
                      onChange: (e) => {handleChange(e); addCook.getData(e)},
                      onBlur: handleBlur
                    }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                  <div style={{color: 'red'}}>
                  {errors.phoneNumber && touched.phoneNumber && errors.phoneNumber}
                    </div>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Email"
                    id="email"
                    inputProps={{
                      type: "email",
                      name: "email",
                      onChange: (e) => {handleChange(e); addCook.getData(e)},
                      onBlur: handleBlur
                    }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                  <div style={{color: 'red'}}>
                  {errors.email && touched.email && errors.email}
                    </div>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Number of Pupils"
                    id="totalPulpil"
                    inputProps={{
                      type: "number",
                      name: "totalPulpil",
                      onChange: (e) => {handleChange(e); addCook.getData(e)},
                      onBlur: handleBlur
                    }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                  <div style={{color: 'red'}}>
                  {errors.totalPulpil && touched.totalPulpil && errors.totalPulpil}
                    </div>
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
                        handleChangeState(e);
                        addCook.getData(e);
                        handleChange(e); 
                      }}
                      onBlur={handleBlur}
                      className={classes.underline}
                      style={{ width: "100%" }}
                      inputProps={{
                        name: "state",
                        id: "state",
                      }}
                    >
                      <option aria-label="None" value="" />
                      {stateValue.map(({ name, _id }) => {
                        return (
                          <option value={name} id={_id}>
                            {name}
                          </option>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <div style={{color: 'red'}}>
                  {errors.state && touched.state && errors.state}
                    </div>
                </GridItem>
              </GridContainer>
              <GridContainer>
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
                      onChange={(e) => {handleChange(e); addCook.getData(e)}}
                      onBlur={handleBlur}
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
                  <div style={{color: 'red'}}>
                  {errors.lga && touched.lga && errors.lga}
                    </div>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
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
                      onChange: (e) => {handleChange(e); addCook.getData(e)},
                      onBlur: handleBlur
                    }}
                  />
                  <div style={{color: 'red'}}>
                  {errors.address && touched.address && errors.address}
                    </div>
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button type="submit" color="primary">
                Submit
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
    )
}
