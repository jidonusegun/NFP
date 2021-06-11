import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BlockIcon from '@material-ui/icons/Block';
import DialogSuspend from 'components/Dialog/DialogSuspend.js';
import CustomInput from "components/CustomInput/CustomInput.js";
import { dataContext } from 'components/context/DataContext';
import { postContent, patchContent } from "utils";
import config from 'utils/config';
import Loading from "components/isLoading";
import userForm from "../../hooks/useForm"; 
// import AddNewPost from 'views/Blog/AddNewPost';

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

export default function PopSuspend({details}) {
  const addCook = userForm(sendToServer);
  // const rejectCook = userForm(sendRejectToServer);
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false)
  const { handleClickOpenSuspend, handleCloseSuspend, handleClose } = useContext(dataContext);
  const token = localStorage.getItem("token");
  const baseUrl = config.API_URL
  
  async function sendToServer() { 
    try {
      setIsLoading(true)
    const {message} = await patchContent(
      `${baseUrl}/school/${details._id}/suspend`,
      addCook.values,
      token
    );
    alert(message)
    setIsLoading(false)
    handleCloseSuspend()
    } catch ({message}) {
      alert(message)
    }
  }

  // const [reason, setReason] = useState({
  //   suspendReason: ""
  // })

  // const handleChange = (e) => {
  //     setReason({ [e.target.name]: e.target.value });
  //   };
  
  // const handleSubmitAll = async (e) => {
  //     handleCloseSuspend();
  
  //     const formData = new FormData();
  //     formData.append("title", reason.suspendReason);
  //     formData.append("title", details.id);
  
  //     e.preventDefault();
  //     const result = await postContent("/api/cooks/add_one/cook.php", FormData);
  
  //     const body = await result;
  //     console.log(body);
  
  //     setReason({
  //       suspendReason: ""
  //     });
  // };

  return (
        <div style={{width: "8rem"}}>
            <DialogSuspend title="Suspend" children={
                <CustomInput
                    labelText="Reason for suspension"
                    id="reason"
                    inputProps={{
                      type: "text",
                      name: "reason",
                      onChange: (e) => addCook.getData(e),
                    }}
                    formControlProps={{
                    fullWidth: true
                    }}
                />
            } noButton="Cancel" yesButton={<>Suspend {isLoading && <Loading />}</>} handleSuspend={addCook.submit}  />
            <button onClick={handleClickOpenSuspend} className={classes.button} title="Suspend"><BlockIcon /></button>
        </div>
    );
}
