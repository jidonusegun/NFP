import React, {useContext, useState} from 'react';
import Divider from '@material-ui/core/Divider';
import { dataContext } from 'components/context/DataContext';
import { makeStyles } from "@material-ui/core/styles";

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
  }
}));

export default function HomePageBlog() {
  const classes = useStyles();
  const { readCheck } = useContext(dataContext);
  // const contentholder = readCheck.content
  const [cssActive, setCssActive] = useState({active: false})
  const toggleClass = () => {
    const currentState = cssActive.active;
    setCssActive({ active: !currentState });
  }
  return (
    <div>
      <div className={classes.cardContainer}>
        {readCheck.map(({title, id, content}) => {
          
          return (
            <div  className={classes.cardContent} key={id}>
              <h3 className={classes.header}>
                {title}
              </h3>
              <p className={cssActive.active ? classes.paragraphAll : classes.paragraph}>
                {content}
                {/* contentholder.length >= 50 ? classes.dBlock : classes.dNone */}
              </p>
              <div className={classes.readMoreContainer}>
                <button className={content.length > 150 ? classes.dNone : classes.dBlock } onClick={toggleClass}>Read More</button>
              </div>
              <Divider/>
              <p className={classes.footer} >by <span className={classes.span} >- State Admin</span></p>
            </div>
          )
        })}
      </div>
    </div>
  )
}