import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import DialogDelete from 'components/Dialog/DialogDelete.js';
import { dataContext } from 'components/context/DataContext';
import { deleteContent, postContent } from 'utils'; 
import CustomInput from "components/CustomInput/CustomInput.js";
import userForm from "hooks/useForm"; 
import Loading from "components/isLoading";
import config from 'utils/config';

const useStyles = makeStyles((theme) => ({
  button: {
    display: "block",
    marginTop: "1rem",
    padding: ".5rem .9",
    color: "white",     
    backgroundColor: "#1976d2",
    borderRadius: "50%",
    fontSize: "2rem",
    border: "none",
    cursor: "pointer",
  },
}));

export default function PopDelete({details}) {
  const deletePost = userForm(sendToServer);
  const classes = useStyles();
  const [message, setMessage] = useState("");
  const { handleClickOpenDelete, handleCloseDelete } = useContext(dataContext);
  const token = localStorage.getItem("token")
  const [isLoading, setIsLoading] = useState(false);
  const baseUrl = config.API_URL

  async function sendToServer() {
    try {
      setIsLoading(true)
      if (deletePost.values.password === deletePost.values.newPassword) {
        deletePost.setData("_id", details._id);
        delete deletePost.values.newPassword;
        const { data } = await postContent(
          `${baseUrl}/admin/savepassword`,
          deletePost.values,
          token
        );
        alert("User password changed successfully");
        handleCloseDelete();
      } else {
        setMessage("Password did not match");
      }

      setIsLoading(false);
    } catch ({ message }) {
      alert(message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
        <div>
            <DialogDelete title="Change Password" children={
              <form>
                <CustomInput
                labelText="Enter New Password"
                id="newPassword"
                inputProps={{
                  type: "password",
                  name: "newPassword",
                  onChange: (e) => deletePost.getData(e),
                }}
                formControlProps={{
                  fullWidth: true,
                }}
              />
                <CustomInput
                labelText="Re-type New Password"
                id="password"
                inputProps={{
                  type: "password",
                  name: "password",
                  onChange: (e) => deletePost.getData(e),
                }}
                formControlProps={{
                  fullWidth: true,
                }}
              />
            </form>
            } noButton="No" yesButton={<>Change Password {isLoading && <Loading />}</>} handleDelete={deletePost.submit} />
            <button onClick={handleClickOpenDelete} className={classes.button} title="Change Password"><DeleteIcon /></button>
        </div>
    );
}
