import React, { useState, useEffect } from "react";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import IconButton from "@material-ui/core/IconButton";
// import { dataContext } from 'components/context/DataContext';
import { patchContent, postContent, getContent, postImageContent } from "utils";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { makeStyles } from "@material-ui/core/styles";
import userForm from "../../hooks/useForm";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Loading from "components/isLoading";
import Toast from "components/toast";
import config from 'utils/config';

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
  underline: {
    "&:hover:not($disabled):before,&:before": {
      borderColor: "#D2D2D2 !important",
      borderWidth: "1px !important",
    },
    "&:after": {
      borderColor: "#9c27b0",
    },
  },
}));

export default function UpdateAdmin({ details }) {
  const addCook = userForm(sendToServer);
  const classes = useStyles();
  const [imageUpload, setImageUpload] = useState({ image: "" });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("id");
  const [stateValue, setStatevalue] = useState([]);
  const [lgaValue, setLgavalue] = useState([]);
  const [successMessage, setSuccessMessage] = useState('')
  const stateLogin = localStorage.getItem("state");
  const lgaLogin = localStorage.getItem("lga");
  const [stateID, setStateID] = useState();
  // const [imageUpload, setImageUpload] = useState({ image: "" });
  const baseUrl = config.API_URL
  // let errorMessage = "";

  useEffect(() => {
    getContent(
      `${baseUrl}/settings/states`,
      token
    ).then((data) => setStatevalue(data.data));

    getContent(
      `${baseUrl}/settings/state/${stateID}/lgas`,
      token
    ).then((data) => setLgavalue(data.data));

  }, [token, stateID, stateLogin, lgaLogin]);

  const handleImageUpload = (e) => {
    setImageUpload({ image: e.target.files[0] });
  };

  async function sendToServer() {
    try {
      setIsLoading(true);
      const imageData = new FormData();
      imageData.append("files", imageUpload?.image);

      const exclude = [
        "address",
        "lga",
        "state",
        "username",
        "email",
        "phoneNumber",
        "birthday",
        "gender",
        "lastName",
        "firstName",
      ];
      exclude.forEach((key) => {
        if (!addCook.values[key]) {
          setErrorMessage(`${key} is required`);
        }
      });
      delete addCook.values.filePicker;
      delete addCook.values.files;
      const tempData = {'tempData': JSON.stringify(addCook.values)};
      const { data } = await patchContent(
        `${baseUrl}/admin/${userId}`,
        addCook.values,
        token
      );
      if (imageUpload?.image) {
        const imageResult = await postImageContent(
          `${baseUrl}/cook/upload-image/${details?._id}`,
          imageData,
          token
        );
      }
      setSuccessMessage("Profile Edited Successfully");
      setIsLoading(false);
    } catch ({ message }) {
      alert(message);
    }
    finally {
      setIsLoading(false);
    }
  }
  const [imageFile, setImageFile] = useState({ file: "", imagePreviewUrl: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handle uploading-", imageFile.file);
  };

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
    $imagePreview = <div className="previewText"></div>;
  }

  const handleChange = (e) => {
    var index = e.target.selectedIndex;
    var optionElement = e.target.childNodes[index];
    var option = optionElement.getAttribute("id");

    setStateID(option);
  };

  return (
    <div>
      <div
        style={{ color: "red", textAlign: "center", width: "100%" }}
      >{`${errorMessage}`}</div>
      <div style={{color: 'green', textAlign: 'center', padding: '1.5rem'}}>{successMessage}</div>
      <GridContainer>
            
        <GridItem xs={12} sm={12} md={12}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              
              <div className={classes.imgPreview}>{$imagePreview}</div>
              <form onSubmit={handleSubmit}>
                <label htmlFor="filePicker">
                  <IconButton
                    color="primary"
                    style={{ margin: "0", padding: "0" }}
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCamera className={classes.fileInput} />
                  </IconButton>
                </label>
                <input
                  id="filePicker"
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
            <GridItem xs={12} sm={12} md={4}>
              <CustomInput
                labelText="Phone Number"
                id="phoneNumber"
                inputProps={{
                  type: "number",
                  name: "phoneNumber",
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
                labelText="Username"
                id="username"
                inputProps={{
                  type: "username",
                  name: "username",
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
                  name: "birthday",
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
                  name: "email",
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
                      onChange: (e) => addCook.getData(e),
                    }}
                  />
                </GridItem>
            </GridContainer>
          <Button onClick={addCook.submit} type="submit" color="primary">
            Edit Profile
            {isLoading && <Loading />}
          </Button>
          <Toast message={message} />
        </GridItem>
      </GridContainer>
    </div>
  );
}

