import React, { useEffect, useState} from 'react';
import image from 'assets/img/faces/marc.jpg';
import Button from '@material-ui/core/Button';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
// import { dataContext } from 'components/context/DataContext';
import Logo from 'assets/img/loogos.png';
import {getContent} from 'utils';
import config from 'utils/config';
import Dialog from 'components/useDialog';
import useDialog from 'components/useDialog/useHook';

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
    bioDataHead: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    profileContent: {
        width: '200px',
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

export default function GenralAdminView({details}) {
    const classes = useStyles();
    const { openDialog, closeDialog, isOpen } = useDialog();
    // const { admins } = useContext(dataContext)
    const token = localStorage.getItem("token")
    const userId = localStorage.getItem("id");
    const [account, setAccount] = useState([])
    const baseUrl = config.API_URL

    const newImage = details?.image?.split('/').pop()

    useEffect(() => {
        	getContent(`${baseUrl}/admin/${userId}`, token)
    		.then(data=>setAccount(data.data))
    }, [token]);
    // console.log(account)
    return (
        <div>
            <div className={classes.topDiv}>
                <div className={classes.imageContainer}>
                    <img src={account?.image ? newImage: Logo} alt="Profile Account" className={classes.img} />
                </div>
                <div className={classes.profileContent}>
                    <div className={classes.bioDataHead}>
                        <div>Username: </div>
                        <div>{account.username}</div>
                    </div>
                    <div className={classes.bioDataHead}>
                        <div className={classes.leftContainer + " " + classes.margin}>Role: </div>
                        <div className={classes.leftContainer + " " + classes.margin}>{account.role}</div>
                    </div>
                    <div className={classes.widthp}>
                        <p className={classes.margin0}>Status: </p>
                        {account.status === "SUSPEND" ? 
                            <div className={classes.widthp} style={{textAlign: "left"}}>
                                <span className={classes.span}>
                                    <ThemeProvider theme={theme}>
                                        <Button variant="contained" size="small" color="secondary">
                                            {account.status}
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
                                            {account.status}
                                        </Button>
                                    </ThemeProvider>
                                </span>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div style={{marginTop: "0", paddingTop: "0"}}>
                <h3 style={{margin: "0", padding: "0"}}>Bio Data</h3>
                <div className={classes.bioData}>
                    <div className={classes.leftContainer + " " + classes.margin}>First Name: </div>
                    <div className={classes.leftContainer + " " + classes.margin}>{account.firstName}</div>
                </div>
                {/* <div className={classes.bioData}>
                    <div className={classes.leftContainer + " " + classes.margin}>Middle Name: </div>
                    <div className={classes.leftContainer + " " + classes.margin}>Paul</div>
                </div> */}
                <div className={classes.bioData}>
                    <div className={classes.leftContainer + " " + classes.margin}>Last Name: </div>
                    <div className={classes.leftContainer + " " + classes.margin}>{account.lastName}</div>
                </div>
                <div className={classes.bioData}>
                    <div className={classes.leftContainer + " " + classes.margin}>Gender: </div>
                    <div className={classes.leftContainer + " " + classes.margin}>{account.gender}</div>
                </div>
                <div className={classes.bioData}>
                    <div className={classes.leftContainer + " " + classes.margin}>Date of Birth: </div>
                    <div className={classes.leftContainer + " " + classes.margin}>{account.birthday}</div>
                </div>
                <div className={classes.bioData}>
                    <div className={classes.leftContainer + " " + classes.margin}>Phone Number: </div>
                    <div className={classes.leftContainer + " " + classes.margin}>{account.phoneNumber}</div>
                </div>
                <div className={classes.bioData}>
                    <div className={classes.leftContainer + " " + classes.margin}>Email Address: </div>
                    <div className={classes.leftContainer + " " + classes.margin}>{account.email}</div>
                </div>
                <div className={classes.bioData}>
                    <div className={classes.leftContainer + " " + classes.margin}>State: </div>
                    <div className={classes.leftContainer + " " + classes.margin}>{account.state}</div>
                </div>
                <div className={classes.bioData}>
                    <div className={classes.leftContainer + " " + classes.margin}>LGA: </div>
                    <div className={classes.leftContainer + " " + classes.margin}>{account.lga}</div>
                </div>
                <div className={classes.bioData}>
                    <div className={classes.leftContainer + " " + classes.margin}>Address: </div>
                    <div className={classes.leftContainer + " " + classes.margin}>{account.address}</div>
                </div>
            </div>
        </div>
    )
}
