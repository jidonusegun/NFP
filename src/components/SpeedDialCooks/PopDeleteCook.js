import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import DialogDelete from 'components/Dialog/DialogDelete.js';
import { dataContext } from 'components/context/DataContext';
import { deleteContent } from 'utils';
import userForm from "hooks/useForm";
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
  console.log(details._id)
  const classes = useStyles();
  const { handleClickOpenDelete, handleCloseDelete  } = useContext(dataContext);
  const token = localStorage.getItem("token")
  const baseUrl = config.API_URL

async function sendToServer() {
  // console.log(addCook.values);
  // console.log(addCook.formData());
  handleCloseDelete();
 
const response = await deleteContent(`${baseUrl}/cook/${details._id}`, token);
// addCook.reset();
console.log(response);
//   const body = await result;
//   console.log(body);
}

  return (
        <div>
            <DialogDelete title="Delete" children={`Are you sure you want to delete ? ${details.firstName} ${details.lastName}`} noButton="No" yesButton="Yes" handleDelete={deletePost.submit} />
            <button onClick={handleClickOpenDelete} className={classes.button} title="Delete"><DeleteIcon /></button>
        </div>
    );
}
