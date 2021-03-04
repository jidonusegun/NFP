import React, {useState, useEffect} from 'react';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
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
        height: "300px",
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

  const theme = createMuiTheme({
    palette: {
      primary: green,
    },
  });

export default function AdminAccountView({details}) {
    const classes = useStyles();
    var token = localStorage.getItem("token");

    const [result, setResult] = useState([]);

    useEffect(() => {
        getContent(`https://nsfp.herokuapp.com/v1/school/${details._id}`, token)
        .then(data => setResult(data.data))
    },[token, details._id])
console.log(details)
    return (
        <div>
            <div className={classes.topDiv}>
                <div className={classes.imageContainer}>
                    <img src={result.status} alt={result.name} className={classes.img} />
                </div>
                <div className={classes.profileContent}>
                    <div className={classes.widthp}>
                        <p className={classes.margin0}>Registered: </p>
                        <div className={classes.widthp}><span className={classes.span}>{result.status}</span></div>
                    </div>
                    <div className={classes.widthp}>
                        <p className={classes.margin0}>Role: </p>
                        <div className={classes.widthp}><span className={classes.span}>School</span></div>
                    </div>
                    <div className={classes.widthp}>
                        <p className={classes.margin0}>Status: </p>
                        {result.status === "SUSPEND" ? 
                            <div className={classes.widthp} style={{textAlign: "left"}}>
                                <span className={classes.span}>
                                    <ThemeProvider theme={theme}>
                                        <Button variant="contained" size="small" color="secondary">
                                            Suspended 
                                        </Button>
                                    </ThemeProvider>
                                </span>
                            </div>
                            :
                            <div className={classes.widthp} style={{textAlign: "left"}}>
                                <span className={classes.span}>
                                    <ThemeProvider theme={theme}>
                                        <Button variant="outlined" size="small" color="primary">
                                            Active
                                        </Button>
                                    </ThemeProvider>
                                </span>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div> 
                <h3>Bio Data</h3>
                <div className={classes.bioData}>
                    <div className={classes.leftContainer + " " + classes.margin}>School Name: </div>
                    <div className={classes.leftContainer + " " + classes.margin}>{result.name}</div>
                </div>
                <div className={classes.bioData}>
                    <div className={classes.leftContainer + " " + classes.margin}>Contact Person: </div>
                    <div className={classes.leftContainer + " " + classes.margin}>{result.contactPerson}</div>
                </div>
                <div className={classes.bioData}>
                    <div className={classes.leftContainer + " " + classes.margin}>Contact Number: </div>
                    <div className={classes.leftContainer + " " + classes.margin}>{result.phoneNumber}</div>
                </div>
                <div className={classes.bioData}>
                    <div className={classes.leftContainer + " " + classes.margin}>Email: </div>
                    <div className={classes.leftContainer + " " + classes.margin}>{result.email}</div>
                </div>
                <div className={classes.bioData}>
                    <div className={classes.leftContainer + " " + classes.margin}>State: </div>
                    <div className={classes.leftContainer + " " + classes.margin}>{result.state}</div>
                </div>
                <div className={classes.bioData}>
                    <div className={classes.leftContainer + " " + classes.margin}>Address: </div>
                    <div className={classes.leftContainer + " " + classes.margin}>{result.address}</div>
                </div>
                <div className={classes.bioData}>
                    <div className={classes.leftContainer + " " + classes.margin}>LGA: </div>
                    <div className={classes.leftContainer + " " + classes.margin}>{result.lga}</div>
                </div>
                <div className={classes.bioData}>
                    <div className={classes.leftContainer + " " + classes.margin}>Number of Pupils: </div>
                    <div className={classes.leftContainer + " " + classes.margin}>{result.totalPulpil}</div>
                </div>

            </div>
        </div>
    )
}
