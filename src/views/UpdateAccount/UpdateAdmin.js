import React, { useState } from "react";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import IconButton from "@material-ui/core/IconButton";
// import { dataContext } from 'components/context/DataContext';
import { patchContent, postContent, postImageContent } from "utils";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { makeStyles } from "@material-ui/core/styles";
import userForm from "../../hooks/useForm";
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
  const baseUrl = config.API_URL
  // let errorMessage = "";

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
        "schoolName",
        "lga",
        "state",
        "role",
        "password",
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

      const { data } = await patchContent(
        `${baseUrl}/admin/${details._id}`,
        addCook.values,
        token
      );
      if (imageUpload?.image) {
        const imageResult = await postImageContent(
          `${baseUrl}/cook/upload-image/${data?._id}`,
          imageData,
          token
        );
      }
      setMessage("Record sent for approval");
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

  return (
    <div>
      <div
        style={{ color: "red", textAlign: "center", width: "100%" }}
      >{`${errorMessage}`}</div>
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
                    addCook.getFile(e);
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
                labelText="Username"
                id="username"
                inputProps={{
                  type: "text",
                  name: "usernames",
                  onChange: (e) => addCook.getData(e),
                }}
                formControlProps={{
                  fullWidth: true,
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <CustomInput
                labelText="Password"
                id="password"
                inputProps={{
                  type: "password",
                  name: "passwords",
                  onChange: (e) => addCook.getData(e),
                }}
                formControlProps={{
                  fullWidth: true,
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
