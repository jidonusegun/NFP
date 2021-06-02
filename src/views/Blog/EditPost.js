import React from 'react';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6
// import { dataContext } from 'components/context/DataContext';
import userForm from "../../hooks/useForm";
import {patchContent} from 'utils';
import config from 'utils/config';

export default function AddNewPost({details}) {
  const addPost = userForm(sendToServer);
  const baseUrl = config.API_URL
  const token = localStorage.getItem("token")

  async function sendToServer() {
    
    const response = await patchContent(`${baseUrl}/${details.id}`, addPost.values, token);
    // addPost.reset();
    console.log(response);
  }

  // const [posts, setPosts] = useState({
  //   content: "",
  //   title: ""
  // });
// const { PatchPost } = useContext(dataContext)
  // const handleChange = (e) => {
  //   setPosts({...posts, [e.target.name]: e.target.value})
  // }
  
  // const handleSubmit = (e) => {
    // 		e.preventDefault();
    
    // 		PatchPost(posts.title, posts.content, id)
    
    // 		setPosts({
    // 			title: "",
          // content: '',
    // 		})
        
    // 	}

  return (
    <div style={{ width: "30rem", minHeight: "400px"}}>
      <form>
        <input style={{display: "block", padding: "12px 10px", border: "1px solid gray", borderRadius: "5px", margin: "1rem 0", width: "95%"}} type="text" name="title" value={addPost.values.title} placeholder="Your Post title here..." onChange={addPost.getData} />
        <ReactQuill style={{backgrounColor: "white", height: "400px", width: "100%" }} name="content" value={addPost.getEditor}
        onChange={addPost.getEditor} />

        <button style={{borderRadius: "5px", color: "white", padding: "5px 10px", border: "none", backgroundColor: "green"}} onClick={addPost.submit}>Send</button>
      </form>
    </div>
  )
}