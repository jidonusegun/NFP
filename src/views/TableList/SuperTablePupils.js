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
import AddPupils from "views/UserProfile/AddPupils";
import { dataContext } from "components/context/DataContext";
import SpeedDialPupils from "components/SpeedDialPupils/SpeedDialPupils.js";
import Download from 'assets/img/Abuja.jpg';
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
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

const FormStyles = {
  formControl: {
    width: "100%",
    marginTop: "0rem",
  },
};

const useStyles = makeStyles(styles);
const useFormStyles = makeStyles(FormStyles);

export default function TableAggregator({state}) {
  const classes = useStyles();
  const Formclass = useFormStyles();
  const { openDialog, closeDialog, isOpen } = useDialog();
  // const uploadExcel = userForm(sendToServer);
  const { handleClickPop, handleClickOpen } = useContext(dataContext);
  const [pupilsDetails, setpupilsDetails] = useState();
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("id")
  const stateLogin = localStorage.getItem("state");
  const lgaLogin = localStorage.getItem("lga");
  const [imageUpload, setImageUpload] = useState({image: ''})
  const [account, setAccount] = useState([]);
  const [schools, setSchools] = useState([])
  const [schoolId, setSchoolId] = useState();
  const baseUrl = config.API_URL

  useEffect(() => {
    setIsLoading(true);
    getContent(
      `${baseUrl}/pupils?state=${state}&lga=${lgaLogin}`,
      token
    ).then((data) => setAccount(data.data));

    getContent(
      `${baseUrl}/schools?state=${state}&lga=${lgaLogin}`,
      token
    ).then((data) => setSchools(data.data));
    setIsLoading(false);
  }, [token, state, lgaLogin]);



  const handleChangeSchool = (e) => {
    var index = e.target.selectedIndex;
    var optionElement = e.target.childNodes[index];
    var option = optionElement.getAttribute("id");

    setSchoolId(option);
  };

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
    const result = await postImageContent(`${baseUrl}/pupils/uploadcsv/${userId}`, data, token);
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
          <AddPupils title="Add Pupil's Data" sendButton="Submit" content={account} />
        }
      />
      <Dialog
        open={isOpen}
        handleClose={closeDialog}
        title="Upload Pupil's List in Excel"
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
            placeholder="Upload Pupils"
            accept=".xlsx, .xls, .csv"
          />
        </form>
      </Dialog>
      <Popover children={<SpeedDialPupils details={pupilsDetails} />} />
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
                        Pupils Details
                      </h4>
                      <p className={classes.cardCategoryWhite}>
                        List of all Pupils
                      </p>
                    </div>
                    <div style={{width: '400px', marginTop: '0px', paddingTop: '0px'}}>
                  <FormControl className={Formclass.formControl}>
                    <InputLabel
                      htmlFor="school"
                      style={{ color: "#D2D2D2", fontWeight: "normal" }}
                    >
                      Select School 
                    </InputLabel>
                    <Select
                      native
                      // value={addCook.values.school}
                      onChange={(e) => {
                        handleChangeSchool(e);
                      //   addCook.getData(e);
                      }}
                      className={classes.underline}
                      style={{ width: "100%" }}
                      inputProps={{
                        name: "school",
                        id: "school",
                      }}
                    >
                      <option aria-label="None" value="" />
                      {schools.map(({ _id, name }) => {
                        return (
                          <option value={name} id={_id}>
                            {name}
                          </option>
                        );
                      })}
                    </Select>
                  </FormControl>
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
                        href={Download}
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
                  { account.length > 0 ?
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
                        {account.map(
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
                          }) => {
                            return (
                              <TableRow
                                key={_id}
                                className={classes.tableBodyRow}
                              >
                                <TableCell className={classes.tableCell}>
                                  <ViewListIcon
                                    style={{ cursor: "pointer" }}
                                    onMouseUp={function (event) {
                                      setpupilsDetails({
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
