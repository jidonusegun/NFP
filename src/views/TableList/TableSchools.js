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
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import AddButton from "components/AddButton/AddButton";
import Popover from "components/Popover/Popover.js";
import DialogContainer from "components/Dialog/DialogContainer.js";
import SchoolProfile from "views/UserProfile/SchoolProfile";
import { dataContext } from "components/context/DataContext";
import SpeedDialSchools from "components/SpeedDialSchools/SpeedDialSchools.js";
import Download from 'assets/img/Abuja.jpg';
import DownloadSchool from 'assets/img/SCHOOL.xlsx';
// icon components
import ViewListIcon from "@material-ui/icons/ViewList";
import config from 'utils/config';
import userForm from "../../hooks/useForm";
import { postContent, getContent, postImageContent } from "utils";
import PublishIcon from '@material-ui/icons/Publish';
import GetAppIcon from "@material-ui/icons/GetApp";
import Dialog from "components/useDialog";
import useDialog from "components/useDialog/useHook";
import Loading from "components/isLoading";
import Toast from "components/toast";

const useStyles = makeStyles(styles);

export default function TableAggregator(props) {
  const classes = useStyles();
  const { openDialog, closeDialog, isOpen } = useDialog();
  // const uploadExcel = userForm(sendToServer);
  const { handleClickPop, handleClickOpen, setSchool, school  } = useContext(dataContext);
  const [schoolDetails, setSchoolDetails] = useState();
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("id")
  const stateLogin = localStorage.getItem("state");
  const lgaLogin = localStorage.getItem("lga");
  const [imageUpload, setImageUpload] = useState({image: ''})
  const [account, setAccount] = useState([]);
  const baseUrl = config.API_URL

  useEffect(() => {
    setIsLoading(true);
    getContent(
      `${baseUrl}/schools?state=${stateLogin}&status=APPROVED`,
      token
    ).then((data) => setSchool(data.data));
    setIsLoading(false);
  }, [token, stateLogin, lgaLogin]);

  

  // async function sendToServer() {
  //   try {
  //     setLoading(true);
  //     const data = new FormData()
  //     data.append('files', uploadExcel.values)
  //     const result = await postImageContent(`https://nsfp.herokuapp.com/v1/school/uploadcsv/${userId}`, data, token);
  //     setLoading(false);
  //     // const newAccount = result.data
  //     // setAccount({...account, newAccount})
  //     closeDialog();
  //     window.location.reload()
  //   } catch ({ message }) {
  //     alert(message);
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
    const result = await postImageContent(`${baseUrl}/school/uploadcsv/${userId}`, data, token);
    alert("School list has been sent for approval")
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
      <DialogContainer
        children={
          <SchoolProfile title="Add School's Data" sendButton="Submit" content={account} />
        }
      />
      <Dialog
        open={isOpen}
        handleClose={closeDialog}
        title="Upload School's List in Excel"
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
            placeholder="Upload Schools"
            accept=".xlsx, .xls, .csv"
          />
        </form>
      </Dialog>
      <Popover children={<SpeedDialSchools details={schoolDetails} />} />
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          {isLoading ? (
            <Loading />
          ) : (
            <div>
                <Card>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <div>
                      <h4 className={classes.cardTitleWhite}>
                        Schools Details
                      </h4>
                      <p className={classes.cardCategoryWhite}>
                        List of all Schools
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
                        href="/media/excel/SCHOOL.xlsx"
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
                  { school.length > 0 ?
                    <Table className={classes.table}>
                      <TableHead style={{ color: "#9c27b0" }}>
                        <TableRow className={classes.tableHeadRow}>
                          <TableCell
                            className={
                              classes.tableCell + " " + classes.tableHeadCell
                            }
                          >
                            ACTION
                          </TableCell>
                          <TableCell
                            className={
                              classes.tableCell + " " + classes.tableHeadCell
                            }
                          >
                            School Name
                          </TableCell>
                          <TableCell
                            className={
                              classes.tableCell + " " + classes.tableHeadCell
                            }
                          >
                            Contact Person
                          </TableCell>
                          <TableCell
                            className={
                              classes.tableCell + " " + classes.tableHeadCell
                            }
                          >
                            Contact Phone No.
                          </TableCell>
                          <TableCell
                            className={
                              classes.tableCell + " " + classes.tableHeadCell
                            }
                          >
                            Email
                          </TableCell>
                          <TableCell
                            className={
                              classes.tableCell + " " + classes.tableHeadCell
                            }
                          >
                            State
                          </TableCell>
                          <TableCell
                            className={
                              classes.tableCell + " " + classes.tableHeadCell
                            }
                          >
                            LGA
                          </TableCell>
                          <TableCell
                            className={
                              classes.tableCell + " " + classes.tableHeadCell
                            }
                          >
                            Address
                          </TableCell>
                          <TableCell
                            className={
                              classes.tableCell + " " + classes.tableHeadCell
                            }
                          >
                            No of Pupils
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {school.map(
                          ({
                            _id,
                            name,
                            contactPerson,
                            phoneNumber,
                            email,
                            state,
                            address,
                            lga,
                            totalPulpil,
                            image,
                            date_created_acc,
                            status,
                          }, index) => {
                            return (
                              <TableRow
                                key={_id}
                                className={classes.tableBodyRow}
                              >
                                <TableCell className={classes.tableCell}>
                                  <ViewListIcon
                                    style={{ cursor: "pointer" }}
                                    onMouseUp={function (event) {
                                      setSchoolDetails({
                                        _id,
                                        name,
                                        contactPerson,
                                        phoneNumber,
                                        email,
                                        state,
                                        address,
                                        lga,
                                        totalPulpil,
                                        date_created_acc,
                                        image,
                                        index
                                      });
                                    }}
                                    onClick={handleClickPop}
                                  />
                                </TableCell>
                                <TableCell className={classes.tableCell}>
                                  {name}
                                </TableCell>
                                <TableCell className={classes.tableCell}>
                                  {contactPerson}
                                </TableCell>
                                <TableCell className={classes.tableCell}>
                                  {phoneNumber}
                                </TableCell>
                                <TableCell className={classes.tableCell}>
                                  {email}
                                </TableCell>
                                <TableCell className={classes.tableCell}>
                                  {state}
                                </TableCell>
                                <TableCell className={classes.tableCell}>
                                  {lga}
                                </TableCell>
                                <TableCell className={classes.tableCell}>
                                  {address}
                                </TableCell>
                                <TableCell className={classes.tableCell}>
                                  {totalPulpil}
                                </TableCell>
                              </TableRow>
                            );
                          }
                        )}
                      </TableBody>
                    </Table>
                  :
                  <div>No Data yet</div> }
                  </CardBody>
                </Card>
            </div>
          )}
        </GridItem>
        <AddButton handleClickOpen={handleClickOpen} title="Add new entity" />
        <Toast message={message} />
      </GridContainer>
    </div>
  );
}
