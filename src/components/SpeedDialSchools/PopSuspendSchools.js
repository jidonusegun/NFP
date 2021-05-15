import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BlockIcon from '@material-ui/icons/Block';
import DialogSuspend from 'components/Dialog/DialogSuspend.js';
import CustomInput from "components/CustomInput/CustomInput.js";
import { dataContext } from 'components/context/DataContext';
import { postContent } from "utils";
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
  const classes = useStyles();
  const { handleClickOpenSuspend, handleCloseSuspend } = useContext(dataContext);
  const token = localStorage.getItem("token");
  
  async function sendToServer() { 
    try {
      // console.log(addCook.values);
    handleCloseSuspend();
    const response = await postContent(
      `https://nsfp.herokuapp.com/v1/school/${details._id}/suspend`,
      addCook.values,
      token
    );
    
    console.log(response);
    //   const body = await result;
    //   console.log(body);
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
                    id="middle-name"
                    inputProps={{
                      type: "text",
                      name: "suspendReason",
                      onChange: (e) => addCook.getData(e),
                    }}
                    formControlProps={{
                    fullWidth: true
                    }}
                />
            } noButton="Cancel" yesButton="Suspend" handleSuspend={addCook.submit}  />
            <button onClick={handleClickOpenSuspend} className={classes.button} title="Suspend"><BlockIcon /></button>
        </div>
    );
}
