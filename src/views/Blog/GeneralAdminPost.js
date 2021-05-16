import React, {useContext, useState, useEffect} from 'react';
import Divider from '@material-ui/core/Divider';
import AddButton from 'components/AddButton/AddButton';
import AddNewPost from 'views/Blog/AddNewPost';
import DialogContainer from 'components/Dialog/DialogContainer.js';
import DialogDelete from 'components/Dialog/DialogDelete';
import { dataContext } from 'components/context/DataContext';
import { makeStyles } from "@material-ui/core/styles";
import userForm from "../../hooks/useForm";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {getContent, deleteContent} from 'utils';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import config from 'utils/config';

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gridColumnGap: "1rem",
    justifyContent: "space-between",

  },
  cardContent: {
    // flex: "0 0 100%",
    backgroundColor: "white",
    padding: "1rem",
    marginBottom: "2rem",
    borderRadius: "10px",
    [theme.breakpoints.up('sm')]: {
      // flex: "0 0 calc(50% - 1rem)",
    },
    [theme.breakpoints.up('md')]: {
      // flex: "0 0 calc(29% - 1rem)",
    },
    [theme.breakpoints.up('lg')]: {
      // flex: "0 0 calc(25% - 1rem)",
    },
  },
  header: {
    margin: "0",
    fontSize: "1rem",
    fontWeight: "bold",
  },
  footer: {
    textAlign: "right",
    fontStyle: "italic",
    fontWeight: "bold",
    fontSize: ".6rem",
    margin: "0 .5rem",
  },
  readMore: {
    textAlign: "right",
    fontSize: ".6rem",
    margin: ".5rem",
    border: "none",
    backgroundColor: "blue",
    color: "white",
    borderRadius: "3px",
    padding: ".5rem",
    cursor: "pointer",
  },
  span: {
    fontWeight: "normal",
  },
  paragraph: {
    height: "5.5rem",
    BoxOrient: "vertical",
    display: "box",
    LineClamp: "6",
    overflow: "hidden",
    textOverflow: "ellipsis",
    // whiteSpace: "nowrap",
  },
  readMoreContainer: {
    display: "flex",
    justifyContent: "flex-end",  
  },
  paragraphAll: {
    height: "unset",
    // -webkitBoxOrient: "vertical",
    display: "unset",
    // -webkitLineClamp: "2",
    overflow: "unset",
    textOverflow: "unset",
    whiteSpace: "unset",
  },
  dNone: {
    display: "none",
  },
  dBlock: {
    display: "block",
    textAlign: "right",
    fontSize: ".6rem",
    margin: ".5rem",
    border: "none",
    backgroundColor: "blue",
    color: "white",
    borderRadius: "3px",
    padding: ".5rem",
    cursor: "pointer",
  },
  postHeader: {
    display: "flex",
    justifyContent: "space-between",
  },
  closePost: {
    backgroundColor: "transparent",
    color: "red",
    border: "none",
    cursor: "pointer",
  }
}));

export default function BlogPosts() {
  const classes = useStyles();
  const addPost = userForm(sendToServer);
  const { handleClickOpen, handleClickOpenDelete, handleCloseDelete } = useContext(dataContext);
  const token = localStorage.getItem("token")
  const [cssActive, setCssActive] = useState({active: false})
  const baseUrl = config.API_URL

  const toggleClass = () => {
    const currentState = cssActive.active;
    setCssActive({ active: !currentState });
  }

  const [posts, setPosts] = useState()
  const [totalCount, setTotalCount] = useState()
  const [pageId, setPageId] = useState({value: 1})
  const [pageCount, setPageCount] = useState()
  const [deletePost, setDeletePost] = useState()
  const [limit, setLimit] = useState(3)

  useEffect(() => {
      getContent(`${baseUrl}/blogs?limit=${limit}&pageId=${pageId.value}`, token)
      .then(data=>setPosts(data.data.blogs))

      getContent(`${baseUrl}/blogs?limit=${limit}&pageId=${pageId.value}`, token)
      .then(data=>setTotalCount(data.data.totalCount))

      getContent(`${baseUrl}/blogs?limit=${limit}&pageId=${pageId.value}`, token)
      .then(data=>setPageId({value: data.data.pageId}))

      getContent(`${baseUrl}/blogs?limit=${limit}&pageId=${pageId.value}`, token)
      .then(data=>setPageCount(data.data.pageCount))

      getContent(`${baseUrl}/blogs?limit=${limit}&pageId=${pageId.value}`, token)
      .then(data=>setLimit(data.data.limit))
  }, [token, limit, pageId.value]);

const indexOfLastPost = pageId.value * limit
const indexOfFirstPost = indexOfLastPost - limit + 1
// console.log(indexOfLastPost)
  async function sendToServer() {
    handleCloseDelete()
    const response = await deleteContent(`${baseUrl}/blog/${deletePost}`, token);
    // addPost.reset();
    console.log(response);
  }
  const handlePrev = () => {
    if(pageId.value >= pageCount) {
      setPageId({...pageId, value: pageId.value - 1})
    }
    else {
      alert("You have reach the last page")
    }
  }
  const handleNext = () => {
    if(pageId.value < pageCount) {
      setPageId({...pageId, value: pageId.value + 1})
    }
    else {
      alert("You have reach the last page")
    }
  }
  // console.log(postIndex)
  return (
    <div>
      <DialogContainer title="Add Post" children= {<AddNewPost />} />
      <DialogDelete title="Delete" children={`Are you sure you want to delete this post ? `} noButton="No" yesButton="Yes" handleDelete={addPost.submit} />
      { posts ?
        <div>
          <div className={classes.cardContainer}>
            {posts.map(({title, _id, content}, index) => {
              // setPostIndex(index)
              console.log(index)
              return (
                <div onShow={() => alert("Hello")} className={classes.cardContent} key={_id}>
                  <div className={classes.postHeader}>
                    <h3 className={classes.header}>
                      {title}
                    </h3>
                    <button className={classes.closePost} onMouseUp={function(event){setDeletePost( _id)}} onClick={handleClickOpenDelete}>X</button>
                  </div>
                  <p className={cssActive.active ? classes.paragraphAll : classes.paragraph}>
                    {content}
                    {/* contentholder.length >= 50 ? classes.dBlock : classes.dNone */}
                  </p>
                  <div className={classes.readMoreContainer}>
                    <button className={content.length > 150 ? classes.dBlock : classes.dNone } onClick={toggleClass}>Read More</button>
                  </div>
                  <Divider/>
                  {/* <p className={classes.footer} >by <span className={classes.span} >- {post_by}</span></p>
                  <p className={classes.footer} >{state}</p> */}
                </div>
              )
            })}
            
          </div>
          <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%"}}>
            <ButtonGroup variant="contained" color="secondary" aria-label="contained primary button group">
              <Button onClick={handlePrev}><ArrowBackIosIcon /></Button>
              <Button>{pageId.value}</Button>
              <Button onClick={handleNext}><ArrowForwardIosIcon /></Button>
            </ButtonGroup>
            <div style={{marginLeft: "4rem"}}>
              <span>{indexOfFirstPost}</span> - <span>{indexOfLastPost}</span> of <span>{totalCount}</span>
            </div>
          </div>
        </div>
      :
        <div className={classes.cardContainer}>No Blog News yet</div> }
      <AddButton handleClickOpen={handleClickOpen} />
  </div>
  )
}
