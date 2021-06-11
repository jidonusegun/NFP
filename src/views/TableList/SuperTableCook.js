import React, { useContext, useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
// import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import AddButton from 'components/AddButton/AddButton';
import Popover from 'components/Popover/Popover.js';
import DialogContainer from 'components/Dialog/DialogContainer.js';
import AddCooks from 'views/UserProfile/AddCooks';
import { dataContext } from 'components/context/DataContext';
import SpeedDialCook from 'components/SpeedDialCooks/SpeedDialCook.js'; 
import Download from 'assets/img/Abuja.jpg';
import DownloadCook from 'assets/img/COOKS.xlsx';
// icon components
import ViewListIcon from '@material-ui/icons/ViewList';
import userForm from "../../hooks/useForm"; 
import config from 'utils/config';
import {postContent, getContent, postImageContent} from 'utils';
import PublishIcon from '@material-ui/icons/Publish';
import GetAppIcon from "@material-ui/icons/GetApp";
import Dialog from 'components/useDialog';
import useDialog from 'components/useDialog/useHook';
import Loading from "components/isLoading";
import Toast from "components/toast";

// import {Link, Router} from 'react-router-dom';


const useStyles = makeStyles(styles);

export default function TableList({state}) {
  const classes = useStyles();
  const { openDialog, closeDialog, isOpen } = useDialog();
  // const uploadExcel = userForm(sendToServer);
  const { handleClickPop, handleClickOpen, setCook, cook  } = useContext(dataContext);
  const [cookDetails, setCookDetails] = useState();
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [account, setAccount] = useState([]) 
  const token = localStorage.getItem("token")
  const userId = localStorage.getItem("id")
  const stateLogin = localStorage.getItem("state")
  const [imageUpload, setImageUpload] = useState({image: ''})
  const baseUrl = config.API_URL

  useEffect(() => {
    setIsLoading(true);
      getContent(`${baseUrl}/cooks?state=${state}&status=APPROVED`, token)
      .then(data=>setCook(data.data))
    setIsLoading(false);
  }, [token, state]);

  // async function sendToServer() {
  //   try {
  //     setLoading(true);
  //     const data = new FormData()
  //     data.append('files', uploadExcel.values)
  //     const result = await postImageContent(`https://nsfp.herokuapp.com/v1/cook/uploadcsv/${userId}`, data, token);
  //     setLoading(false);
  //     // const newAccount = result.data
  //     // setAccount({...account, newAccount})
  //     closeDialog();
  //     window.location.reload()
  //   } catch ({message}) {
  //     setMessage(message)
  //     setLoading(false);
  //   }
  // }

  const handleChange = (e) => {
    setImageUpload({image: e.target.files[0]})
  }

  async function submitUpload() {
    try {
      setLoading(true);
      const data = new FormData()
      data.append('files', imageUpload.image)
    const result = await postImageContent(`${baseUrl}/cook/uploadcsv/${userId}`, data, token);
    alert("Cook list has been sent for approval")
    closeDialog();
    }
    catch ({message}) {
      setMessage(message)
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <DialogContainer children= {<AddCooks content={account} />} />
      <Dialog
                open={isOpen}
                handleClose={closeDialog}
                title="Upload Cook's List in Excel"
                size="sm"
                buttons={[
                    {
                        value: <>Upload {loading && <Loading />}</>,
                        onClick: () => submitUpload(),
                    },
                ]}
            >
                <form>
                    <input
                        id="files"
                        onChange={(e) => handleChange(e)}
                        type="file"
                        placeholder="Upload Cooks"
                        accept=".xlsx, .xls, .csv"
                    />
                </form>
            </Dialog>
      <Popover children={<SpeedDialCook details={cookDetails} />} /> 
      <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        {isLoading ? <Loading /> :
          <div>
            <Card>
              <CardHeader color="primary" className={classes.cardHeader}>
                <div>
                  <h4 className={classes.cardTitleWhite}>Cooks Details</h4>
                  <p className={classes.cardCategoryWhite}>
                    List of all Cooks
                  </p>
                </div>
                <div
                    style={{
                      marginRight: "30px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginRight: '2rem'
                      }}
                    >
                      <a
                        href="/media/excel/COOKS.xlsx"
                        target="_blank"
                        style={{color: 'white'}}
                        rel="noopener noreferrer"
                        download
                      >
                        <GetAppIcon
                          fontSize="large"
                          style={{ cursor: "pointer" }}
                        />
                      </a>
                      <p style={{ margin: "0px", padding: "0px" }}>
                        Download Excel Template
                      </p>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                      <PublishIcon
                        onClick={() => openDialog()}
                        fontSize="large"
                        style={{ cursor: "pointer" }}
                      />
                      <p style={{ margin: "0px", padding: "0px" }}>
                        Excel Upload
                      </p>
                    </div>
                  </div>
              </CardHeader>
              <CardBody> 
              { cook.length > 0 ?
                    <Table className={classes.table}>
                  
                    <TableHead style={{color: "#9c27b0"}}>
                    <TableRow className={classes.tableHeadRow}>
                        <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>ACTION</TableCell>
                          <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>FIRST NAME</TableCell>
                          <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>LAST NAME</TableCell>
                          <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>GENDER</TableCell>
                          <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>DATE OF BIRTH</TableCell>
                          <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>ACCOUNT NO.</TableCell>
                          <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>BANK NAME</TableCell>
                          <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>BVN</TableCell>
                          <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>MOBILE NUMBER</TableCell>
                          <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>EMAIL</TableCell>
                          <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>STATE</TableCell>
                          <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>LGA</TableCell>
                          <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>ADDRESS</TableCell>
                          <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>SCHOOL NAME</TableCell>
                          <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>NO. OF PUPILS TO FEED</TableCell>
                          <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>AMOUNT PER MEAL</TableCell>
                          <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>NO. OF DAYS PER CYCLE</TableCell>
                      </TableRow>
                    </TableHead>
                  <TableBody>
                    {cook.map(({_id, gender, firstName, lastName, birthday, accountNumber, bankName, bvn, phoneNumber, email, date_created_acc, state, address, lga, schoolName, image, status, pupilsFeed, numberOfPulpilFed, numberOfDaysPerCycle, amountPerMeal}, index) => {
                      
                      return (
                        <>
                          <TableRow key={_id} className={classes.tableBodyRow}>
                            <TableCell className={classes.tableCell}><ViewListIcon style={{cursor: "pointer"}} onMouseUp={function(event){ setCookDetails({_id, gender, firstName, lastName, accountNumber, bankName, bvn, phoneNumber, email, state, date_created_acc, address, birthday, lga, schoolName, image, numberOfPulpilFed, numberOfDaysPerCycle, amountPerMeal});}}  onClick={handleClickPop}/></TableCell>
                            <TableCell className={classes.tableCell}>{firstName}</TableCell>
                            <TableCell className={classes.tableCell}>{lastName}</TableCell>
                            <TableCell className={classes.tableCell}>{gender}</TableCell>
                            <TableCell className={classes.tableCell}>{birthday}</TableCell>
                            <TableCell className={classes.tableCell}>{accountNumber}</TableCell>
                            <TableCell className={classes.tableCell}>{bankName}</TableCell>
                            <TableCell className={classes.tableCell}>{bvn}</TableCell>
                            <TableCell className={classes.tableCell}>{phoneNumber}</TableCell>
                            <TableCell className={classes.tableCell}>{email}</TableCell>
                            <TableCell className={classes.tableCell}>{state}</TableCell>
                            <TableCell className={classes.tableCell}>{lga}</TableCell>
                            <TableCell className={classes.tableCell}>{address}</TableCell>
                            <TableCell className={classes.tableCell}>{schoolName}</TableCell>
                            <TableCell className={classes.tableCell}>{numberOfPulpilFed}</TableCell>
                            <TableCell className={classes.tableCell}>{amountPerMeal}</TableCell>
                            <TableCell className={classes.tableCell}>{numberOfDaysPerCycle}</TableCell>
                          </TableRow>
                        </>
                      )
                    })}
                  </TableBody>
                </Table>
              :
              <div>No Data yet</div> }
              </CardBody>
            </Card>
          </div>
          
        }
      </GridItem>
            
    </GridContainer>
    <Toast message={message} />
        <AddButton handleClickOpen={handleClickOpen} title="Add new entity" />
    </div>
  );
}
