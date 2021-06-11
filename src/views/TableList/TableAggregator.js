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
import AddAggregators from "views/UserProfile/AddAggregators";
import { dataContext } from "components/context/DataContext";
import SpeedDialAggregator from "components/SpeedDialAggregator/SpeedDialAggregator.js";
import Download from 'assets/img/Abuja.jpg';
// icon components
import ViewListIcon from "@material-ui/icons/ViewList";
import userForm from "../../hooks/useForm";
import config from "utils/config";
import { postContent, getContent, postImageContent } from "utils";
import PublishIcon from '@material-ui/icons/Publish';
import GetAppIcon from "@material-ui/icons/GetApp";
import Dialog from "components/useDialog";
import useDialog from "components/useDialog/useHook";
import Loading from "components/isLoading";
import Toast from "components/toast";

const useStyles = makeStyles(styles);

export default function TableAggregator() {
  const classes = useStyles();
  const { openDialog, closeDialog, isOpen } = useDialog();
  // const uploadExcel = userForm(sendToServer);
  const { handleClickPop, handleClickOpen, setAggregator, aggregator  } = useContext(dataContext);
  const [aggregatorDetails, setAggregatorDetails] = useState();
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [account, setAccount] = useState([]);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("id");
  const stateLogin = localStorage.getItem("state");
  const lgaLogin = localStorage.getItem("lga");
  const [imageUpload, setImageUpload] = useState({ image: "" });
  const baseUrl = config.API_URL;

  useEffect(() => {
    setIsLoading(true);
    getContent(
      `${baseUrl}/aggregators?state=${stateLogin}&status=APPROVED`,
      token
    ).then((data) => setAggregator(data.data));
    setIsLoading(false);
  }, [token, stateLogin, lgaLogin]);

  // async function sendToServer() {
  //   try {
  //     setLoading(true);
  //     const data = new FormData()
  //     data.append('files', uploadExcel.values)
  //     const result = await postImageContent(`https://nsfp.herokuapp.com/v1/aggregator/uploadcsv/${userId}`, data, token);
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
    setImageUpload({ image: e.target.files[0] });
  };

  async function submitUpload() {
    try {
      setLoading(true);
      const data = new FormData();
      data.append("files", imageUpload.image);
      const result = await postImageContent(
        `${baseUrl}/aggregator/uploadcsv/${userId}`,
        data,
        token
      );
      alert("Aggregator list has been sent for approval");
      closeDialog();
    } catch ({ message }) {
      setMessage(message);
    } finally {
      setLoading(false);
    }
  }

  if (window.performance && window.performance.navigation.type === window.performance.navigation.TYPE_BACK_FORWARD) {
    alert('Got here using the browser "Back" or "Forward" button.');
}

// console.log(account)

  const status = account.map(({status}) => status)
// console.log(status)
  return (
    <div>
      <DialogContainer children={<AddAggregators content={account} />} />
      <Popover children={<SpeedDialAggregator details={aggregatorDetails} />} />
      <Dialog
        open={isOpen}
        handleClose={closeDialog}
        title="Upload Aggregator's List in Excel"
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
            placeholder="Upload Aggregators"
            accept=".xlsx, .xls, .csv"
          />
        </form>
      </Dialog>
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
                      Aggregators Details
                    </h4>
                    <p className={classes.cardCategoryWhite}>
                      List of all Aggregators
                    </p>
                  </div>
                  {/* <div
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
                  </div> */}
                </CardHeader>
                <CardBody>
                  {aggregator.length > 0 ? (
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
                            COMPANY NAME
                          </TableCell>
                            <TableCell
                            className={
                              classes.tableCell + " " + classes.tableHeadCell
                            }
                          >
                            STATE
                          </TableCell>
                          <TableCell
                            className={
                              classes.tableCell + " " + classes.tableHeadCell
                            }
                          >
                            UNIT PRICE
                          </TableCell> 
                          <TableCell
                            className={
                              classes.tableCell + " " + classes.tableHeadCell
                            }
                          >
                            PHONE NUMBER
                          </TableCell>
                          <TableCell
                            className={
                              classes.tableCell + " " + classes.tableHeadCell
                            }
                          >
                            BANK NAME
                          </TableCell>
                          <TableCell
                            className={
                              classes.tableCell + " " + classes.tableHeadCell
                            }
                          >
                            ACCOUNT NUMBER
                          </TableCell>
                          <TableCell
                            className={
                              classes.tableCell + " " + classes.tableHeadCell
                            }
                          >
                            TIN
                          </TableCell>
                          <TableCell
                            className={
                              classes.tableCell + " " + classes.tableHeadCell
                            }
                          >
                            DAY FOR CONSUMPTION
                          </TableCell>
                          <TableCell
                            className={
                              classes.tableCell + " " + classes.tableHeadCell
                            }
                          >
                            FREQUENCY OF SUPPLY
                          </TableCell>
                          <TableCell
                            className={
                              classes.tableCell + " " + classes.tableHeadCell
                            }
                          >
                            NO. OF DAYS PER CYCLE
                          </TableCell>
                          <TableCell
                            className={
                              classes.tableCell + " " + classes.tableHeadCell
                            }
                          >
                            NO. OF PUPILS TO FEED
                          </TableCell>
                          
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {aggregator.map(
                          ({
                            acctNumber, bankName, companyName, dayForConsumption, frequencyOfSupply, numberOfDaysPerCycle, numberOfPulpilFed, phoneNumber, registeredBy, state, status, tin, unitPrice, _id,
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
                                      setAggregatorDetails({
                                        acctNumber, bankName, companyName, dayForConsumption, frequencyOfSupply, numberOfDaysPerCycle, numberOfPulpilFed, phoneNumber, registeredBy, state, status, tin, unitPrice, _id, index
                                      });
                                    }}
                                    onClick={handleClickPop}
                                  />
                                </TableCell>
                                <TableCell className={classes.tableCell}>
                                  {companyName}
                                </TableCell>
                                <TableCell className={classes.tableCell}>
                                  {state}
                                </TableCell>
                                <TableCell className={classes.tableCell}>
                                  {unitPrice}
                                </TableCell>
                                <TableCell className={classes.tableCell}>
                                  {phoneNumber}
                                </TableCell>
                                <TableCell className={classes.tableCell}>
                                  {bankName}
                                </TableCell>
                                <TableCell className={classes.tableCell}>
                                  {acctNumber}
                                </TableCell>
                                <TableCell className={classes.tableCell}>
                                  {tin}
                                </TableCell>
                                <TableCell className={classes.tableCell}>
                                  {dayForConsumption}
                                </TableCell>
                                <TableCell className={classes.tableCell}>
                                  {frequencyOfSupply}
                                </TableCell>
                                <TableCell className={classes.tableCell}>
                                  {numberOfDaysPerCycle}
                                </TableCell>
                                <TableCell className={classes.tableCell}>
                                  {numberOfPulpilFed}
                                </TableCell>
                              </TableRow>
                            );
                          }
                        )}
                      </TableBody>
                    </Table>
                  ) : (
                    <div>No Data yet</div>
                  )}
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
