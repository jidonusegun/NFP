import React, { useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import image from 'assets/img/faces/marc.jpg';
// import { green } from '@material-ui/core/colors';
// import { dataContext } from 'components/context/DataContext';
import Logo from 'assets/img/loogos.png';
import {getContent} from 'utils';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
    topDiv: {
        display: "flex",
        flexWrap: "wrap",
    },
    imageContainer: {
        width: "300px",
        height: "230px",
        [theme.breakpoints.down('sm')]: {
            width: "200px",
        }
    },
    img: {
        width: "200px",
        height: "200px",
    },
    widthp: {
        width: "200px",
        display: "flex",
        // justifyContent: "space-between",
    },
    margin0: {
        margin: ".5rem",
        width: "250px",
    },
    span: {
        margin: ".5rem",
    },
    bioData: {
        display: "flex",
        flexWrap: "wrap",

        // justifyContent: "space-between",
    },
    leftContainer: {
        width: "50%",
    },
    margin: {
        padding: "1.5rem 0"
    },
    profileContent: {
        [theme.breakpoints.down('md')]: {
            // width: "250px",
        }
    }
  }));

//   const theme = createMuiTheme({
//     palette: {
//       primary: green,
//     },
//   });

export default function GenralAdminView() {
    const classes = useStyles();
    // const { admins } = useContext(dataContext)
    const token = localStorage.getItem("token")
    const [account, setAccount] = useState([])

    const newImage = details?.image?.split('/').pop()

    useEffect(() => {
        	getContent(`https://nsfp.herokuapp.com/v1/`, token)
    		.then(data=>setAccount(data.data))
    }, [token]);
    
    return (
        <div>
            <div className={classes.topDiv}>
                <div className={classes.imageContainer}>
                    <img src={result?.image ? newImage: Logo} alt="Profile Account" className={classes.img} />
                </div>
                <div className={classes.profileContent}>
                    <div className={classes.bioData}>
                        <div className={classes.leftContainer + " " + classes.margin}>Username: </div>
                        <div className={classes.leftContainer + " " + classes.margin}>WilsonJohn</div>
                    </div>
                </div>
            </div>
            <div style={{marginTop: "0", paddingTop: "0"}}>
                <h3 style={{margin: "0", padding: "0"}}>Bio Data</h3>
                <div className={classes.bioData}>
                    <div className={classes.leftContainer + " " + classes.margin}>Title: </div>
                    <div className={classes.leftContainer + " " + classes.margin}>Mr.</div>
                </div>
                <div className={classes.bioData}>
                    <div className={classes.leftContainer + " " + classes.margin}>First Name: </div>
                    <div className={classes.leftContainer + " " + classes.margin}>Wilson</div>
                </div>
                <div className={classes.bioData}>
                    <div className={classes.leftContainer + " " + classes.margin}>Middle Name: </div>
                    <div className={classes.leftContainer + " " + classes.margin}>Paul</div>
                </div>
                <div className={classes.bioData}>
                    <div className={classes.leftContainer + " " + classes.margin}>Last Name: </div>
                    <div className={classes.leftContainer + " " + classes.margin}>John</div>
                </div>
                <div className={classes.bioData}>
                    <div className={classes.leftContainer + " " + classes.margin}>Phone Number: </div>
                    <div className={classes.leftContainer + " " + classes.margin}>+2348178458963</div>
                </div>
                <div className={classes.bioData}>
                    <div className={classes.leftContainer + " " + classes.margin}>Email Address: </div>
                    <div className={classes.leftContainer + " " + classes.margin}>wilsonpauljohn@gmail.com</div>
                </div>
                <div className={classes.bioData}>
                    <div className={classes.leftContainer + " " + classes.margin}>State: </div>
                    <div className={classes.leftContainer + " " + classes.margin}>Lagos</div>
                </div>
                <div className={classes.bioData}>
                    <div className={classes.leftContainer + " " + classes.margin}>City: </div>
                    <div className={classes.leftContainer + " " + classes.margin}>Badagry</div>
                </div>
                <div className={classes.bioData}>
                    <div className={classes.leftContainer + " " + classes.margin}>Address: </div>
                    <div className={classes.leftContainer + " " + classes.margin}>No.1, wilson street, aradagun, Badagry, Lagos State</div>
                </div>
                <div className={classes.bioData}>
                    <div className={classes.leftContainer + " " + classes.margin}>Username: </div>
                    <div className={classes.leftContainer + " " + classes.margin}>WilsonJohn</div>
                </div>

            </div>
        </div>
    )
}
