import React, { useState, useContext, useEffect } from "react";
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
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { dataContext } from "components/context/DataContext";
import CardAvatar from "components/Card/CardAvatar.js";
import { postContent, getContent, postImageContent } from "utils";
import loogos from "assets/img/loogos.png";
import userForm from "../../hooks/useForm";
import Loading from "components/isLoading";
import Toast from "components/toast";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
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
    display: "none",
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
      borderWidth: "1px !important",
    },
    "&:after": {
      borderColor: "#9c27b0",
    },
  },
};

const useStyles = makeStyles(styles);

export default function UserProfile({ title, subTitle, sendButton, content }) {
  const addUser = userForm(sendToServer);
  const classes = useStyles();

  const { handleClose } = useContext(dataContext);
  var token = localStorage.getItem("token");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [stateValue, setStatevalue] = useState([]);
  const [lgaValue, setLgavalue] = useState([]);
  const [stateID, setStateID] = useState();
  const [imageUpload, setImageUpload] = useState({ image: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const userId = localStorage.getItem("id");
  const baseUrl = localStorage.getItem("baseUrl")

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
  }, [token, stateID]);

  const handleImageUpload = (e) => {
    setImageUpload({ image: e.target.files[0] });
  };

  async function sendToServer() {
    try {
      setIsLoading(true);
      const imageData = new FormData();
      imageData.append("files", imageUpload?.image);

      const exclude = ['address','schoolName','lga','state','role','password','username','email','phoneNumber','birthday','gender','lastName','firstName',];
      exclude.forEach((key) => {
        if (!addUser.values[key]) {
          setErrorMessage(`${key} is required`);
        }
      });
      addUser.setData('registeredBy', userId)
      delete addUser.values.filePicker;
      delete addUser.values.files;

      const {data} = await postContent(
        `${baseUrl}/admin`,
        addUser.values,
        token
      );

      if (imageUpload?.image) {
        const imageResult = await postImageContent(
          `${baseUrl}/admin/upload-image/${data?._id}`,
          imageData,
          token
        );
      }
// content.unshift(data)
setMessage('Record sent for approval')
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
    var optionElement = e.target.childNodes[index];
    var option = optionElement.getAttribute("id");

    setStateID(option);
  };

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
    $imagePreview = (
      <div className="previewText" style={{ borderRadius: "50%", margin: "0" }}>
        <img src={loogos} alt="logo" />
      </div>
    );
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                {title ? title : "Edit Data"}
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
                    <form onSubmit={handleSubmit}>
                      <label htmlFor="filePicker">
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
                        id="filePicker"
                        style={{ visibility: "hidden" }}
                        type="file"
                        name="uploadPicture"
                        className={classes.input}
                        onChange={(e) => {
                          // addUser.getFile(e)
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
                      onChange: (e) => addUser.getData(e),
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
                      onChange: (e) => addUser.getData(e),
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
                      value={addUser.values.gender}
                      onChange={addUser.getData}
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
                      fullWidth: true,
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
                      fullWidth: true,
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
                    <InputLabel
                      htmlFor="state"
                      style={{ color: "#D2D2D2", fontWeight: "normal" }}
                    >
                      State
                    </InputLabel>
                    <Select
                      native
                      value={addUser.values.state}
                      onChange={(e) => {
                        handleChange(e);
                        addUser.getData(e);
                      }}
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
                          <option value={name} id={_id} key={_id}>
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
                      value={addUser.values.lga}
                      onChange={addUser.getData}
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
                      fullWidth: true,
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
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControl className={classes.formControl}>
                    <InputLabel
                      htmlFor="role"
                      style={{ color: "#D2D2D2", fontWeight: "normal" }}
                    >
                      Role
                    </InputLabel>
                    <Select
                      native
                      value={addUser.values.role}
                      onChange={addUser.getData}
                      className={classes.underline}
                      style={{ width: "100%" }}
                      inputProps={{
                        name: "role",
                        id: "role",
                      }}
                    >
                      <option aria-label="None" value="" />
                      <option value="SUPER_ADMIN">Super Admin</option>
                      <option value="ADMIN">Program Manager</option>
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
                      fullWidth: true,
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
              <Button onClick={addUser.submit} color="primary">
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
