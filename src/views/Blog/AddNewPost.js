import React, {useState, useContext} from 'react';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6
import {postContent} from 'utils';
import { dataContext } from 'components/context/DataContext';
import userForm from "../../hooks/useForm";
import config from 'utils/config';

export default function AddNewPost() {
  const [value, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("")
  const addPost = userForm(sendToServer);
  const { handleClose } = useContext(dataContext);
  const token = localStorage.getItem("token")
  const stateId = localStorage.getItem("id")
  const baseUrl = config.API_URL
  
  async function sendToServer() {
    addPost.setData("content", value)
    addPost.setData("adminId", stateId)
    if(!addPost.values.title) {
      setErrorMessage("Title is required")
    }
    else if(value === "") {
      setErrorMessage("Content is required")
    }
    else {
      postContent(`${baseUrl}/blog`, addPost.values, token);
      handleClose()
    }
  }

  console.log(value)

  let reactQuillRef = null;

  const onChangeText = () => {
    const editor = reactQuillRef.getEditor();
    const unprivilegedEditor = reactQuillRef.makeUnprivilegedEditor(editor);
    // You may now use the unprivilegedEditor proxy methods
    const inpText = unprivilegedEditor.getText();
    setValue(inpText)
    }
    

  return (
    <div style={{ width: "30rem", minHeight: "400px"}}>
      <div style={{color: "red", textAlign: "center", width: "100%"}}>{`${errorMessage}`}</div>
      <form>
        <input style={{display: "block", padding: "12px 10px", border: "1px solid gray", borderRadius: "5px", margin: "1rem 0", width: "95%"}} type="text" name="title" value={addPost.values.title} placeholder="Your Post title here..." onChange={addPost.getData}  />
        <ReactQuill style={{backgrounColor: "white", height: "400px", maxWidth: "100%" }} name="content" onChange={onChangeText} ref={(el) => { reactQuillRef = el }} />

        <button style={{borderRadius: "5px", color: "white", padding: "5px 10px", width: "100px", height: "40px", border: "none", backgroundColor: "green", cursor: "pointer", display: "block", marginTop: "3rem"}} onClick={addPost.submit}>Send</button>        
      </form>
    </div>
  )
}