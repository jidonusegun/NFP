import React, {useState, useEffect} from 'react';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Logo from 'assets/img/loogos.png';
import {getContent, postContent} from 'utils';
import Dialog from 'components/useDialog';
import useDialog from 'components/useDialog/useHook';
import Loading from "components/isLoading";
import userForm from "../../../hooks/useForm";
import config from 'utils/config';

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
        width: "170px",
        height: "170px",
        [theme.breakpoints.down('sm')]: {
            width: "200px",
        }
    },
    img: {
        width: "150px",
        height: "150px",
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
    const { openDialog, closeDialog, isOpen } = useDialog();
    const addCook = userForm(sendToServer);
    const [result, setResult] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const baseUrl = config.API_URL
    const newImage = details?.image?.split('/').pop()

    useEffect(() => {
        getContent(`${baseUrl}/cook/${details?._id}`, token)
        .then(data => setResult(data.data))
    },[token, details._id])

    async function sendToServer() {
        try {
            const imageUpload = await postContent(
                `${baseUrl}/cook/${details?._id}/reactivate`, token
              );
        } catch ({message}) {
            alert(message)
        }
    }

    return (
        <div>
            <Dialog
                open={isOpen}
                handleClose={closeDialog}
                title="Active Cook"
                size="sm"
                buttons={[
                    {
                        value: <>Active {isLoading && <Loading />}</>,
                        onClick: addCook.submit,
                    },
                ]}
            >
                Are you sure you want to active ?
            </Dialog>
            <div className={classes.topDiv}>
                <div className={classes.imageContainer}>
                    <img src={result?.image ? newImage: Logo} alt={result.firstName} className={classes.img} />
                </div>
                <div className={classes.profileContent}>
                    {/* <div className={classes.widthp}>
                        <p className={classes.margin0}>Registered: </p>
                        <div className={classes.widthp}><span className={classes.span}>{result.status}</span></div>
                    </div> */}
                    <div className={classes.widthp}>
                        <p className={classes.margin0}>Role: </p>
                        <div className={classes.widthp}><span className={classes.span}>Cook</span></div>
                    </div>
                    <div className={classes.widthp}>
                        <p className={classes.margin0}>Status: </p>
                        {result.status === "SUSPEND" ? 
                            <div className={classes.widthp} style={{textAlign: "left"}}>
                                <span className={classes.span}>
                                    <ThemeProvider theme={theme}>
                                        <Button variant="contained" size="small" color="secondary">
                                            {result.status}
                                        </Button>
                                    </ThemeProvider>
                                </span>
                                <div>
                                <span className={classes.span}>
                                    <ThemeProvider theme={theme}>
                                        <Button onClick={() => openDialog()} variant="contained" size="small" color="primary">
                                            Active 
                                        </Button>
                                    </ThemeProvider>
                                </span>
                                </div>
                            </div>
                            :
                            <div className={classes.widthp} style={{textAlign: "left"}}>
                                <span className={classes.span}>
                                    <ThemeProvider theme={theme}>
                                        <Button variant="outlined" size="small" color="primary">
                                            {result.status}
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
                    <div className={classes.leftContainer + " " + classes.margin}>First Name: </div>
                    <div className={classes.leftContainer + " " + classes.margin}>{result.firstName}</div>
                </div>
                <div className={classes.bioData}>
                    <div className={classes.leftContainer + " " + classes.margin}>Last Name: </div>
                    <div className={classes.leftContainer + " " + classes.margin}>{result.lastName}</div>
                </div>
                <div className={classes.bioData}>
                    <div className={classes.leftContainer + " " + classes.margin}>Gender: </div>
                    <div className={classes.leftContainer + " " + classes.margin}>{result.gender}</div>
                </div>
                <div className={classes.bioData}>
                    <div className={classes.leftContainer + " " + classes.margin}>Date of Birth: </div>
                    <div className={classes.leftContainer + " " + classes.margin}>{result.birthday}</div>
                </div>
                <div className={classes.bioData}>
                    <div className={classes.leftContainer + " " + classes.margin}>Account Number: </div>
                    <div className={classes.leftContainer + " " + classes.margin}>{result.accountNumber}</div>
                </div>
                <div className={classes.bioData}>
                    <div className={classes.leftContainer + " " + classes.margin}>Bank Name: </div>
                    <div className={classes.leftContainer + " " + classes.margin}>{result.bankName}</div>
                </div>
                <div className={classes.bioData}>
                    <div className={classes.leftContainer + " " + classes.margin}>BVN: </div>
                    <div className={classes.leftContainer + " " + classes.margin}>{result.bvn}</div>
                </div>
                <div className={classes.bioData}>
                    <div className={classes.leftContainer + " " + classes.margin}>Amount Per Meal: </div>
                    <div className={classes.leftContainer + " " + classes.margin}>{result.amountPerMeal}</div>
                </div>
                <div className={classes.bioData}>
                    <div className={classes.leftContainer + " " + classes.margin}>No. of Pupils to Feed: </div>
                    <div className={classes.leftContainer + " " + classes.margin}>{result.numberOfPulpilFed}</div>
                </div>
                <div className={classes.bioData}>
                    <div className={classes.leftContainer + " " + classes.margin}>No. of Days Per Cycle: </div>
                    <div className={classes.leftContainer + " " + classes.margin}>{result.numberOfDaysPerCycle}</div>
                </div>
                <div className={classes.bioData}>
                    <div className={classes.leftContainer + " " + classes.margin}>School Name: </div>
                    <div className={classes.leftContainer + " " + classes.margin}>{result.schoolName}</div>
                </div>
                {/* <div className={classes.bioData}>
                    <div className={classes.leftContainer + " " + classes.margin}>No. of Pupils Feed Name: </div>
                    <div className={classes.leftContainer + " " + classes.margin}>{result.pupilsFeed}</div>
                </div> */}
                <div className={classes.bioData}>
                    <div className={classes.leftContainer + " " + classes.margin}>Phone Number: </div>
                    <div className={classes.leftContainer + " " + classes.margin}>{result.phoneNumber}</div>
                </div>
                <div className={classes.bioData}>
                    <div className={classes.leftContainer + " " + classes.margin}>Email Address: </div>
                    <div className={classes.leftContainer + " " + classes.margin}>{result.email}</div>
                </div>
                <div className={classes.bioData}>
                    <div className={classes.leftContainer + " " + classes.margin}>State: </div>
                    <div className={classes.leftContainer + " " + classes.margin}>{result.state}</div>
                </div>
                <div className={classes.bioData}>
                    <div className={classes.leftContainer + " " + classes.margin}>LGA: </div>
                    <div className={classes.leftContainer + " " + classes.margin}>{result.lga}</div>
                </div>
                <div className={classes.bioData}>
                    <div className={classes.leftContainer + " " + classes.margin}>Address: </div>
                    <div className={classes.leftContainer + " " + classes.margin}>{result.address}</div>
                </div>
            </div>
        </div>
    )
}
