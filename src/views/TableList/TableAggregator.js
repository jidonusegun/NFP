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
// icon components
import ViewListIcon from "@material-ui/icons/ViewList";
import userForm from "../../hooks/useForm"; 
import {postContent, getContent, postImageContent} from 'utils';
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import Dialog from 'components/useDialog';
import useDialog from 'components/useDialog/useHook';
import Loading from "components/isLoading";
import Toast from "components/toast";

const useStyles = makeStyles(styles);

export default function TableAggregator() {
  const classes = useStyles();
  const { openDialog, closeDialog, isOpen } = useDialog();
  // const uploadExcel = userForm(sendToServer);
  const { handleClickPop, handleClickOpen } = useContext(dataContext);
  const [aggregatorDetails, setAggregatorDetails] = useState();
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [account, setAccount] = useState([]);
  const [message, setMessage] = useState('')
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("id")
  const stateLogin = localStorage.getItem("state");
  const lgaLogin = localStorage.getItem("lga");
  const [imageUpload, setImageUpload] = useState({image: ''})
  const baseUrl = localStorage.getItem("baseUrl")

  useEffect(() => {
    setIsLoading(true); 
    getContent(
      `${baseUrl}/aggregators?state=${stateLogin}&lga=${lgaLogin}`,
      token
    ).then((data) => setAccount(data.data));
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
    setImageUpload({image: e.target.files[0]})
  }

  async function submitUpload() {
    try {
      setLoading(true);
      const data = new FormData()
      data.append('files', imageUpload.image)
    const result = await postImageContent(`${baseUrl}/aggregator/uploadcsv/${userId}`, data, token);
    alert("Aggregator list has been sent for approval")
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
                    <div>
                      <SaveAltIcon
                      onClick={() => openDialog()}
                        fontSize="large"
                        style={{ marginRight: "30px", cursor: "pointer" }}
                      />
                      <p style={{margin: "0px", padding: "0px"}}>Excel Upload</p>
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
                            FIRST NAME
                          </TableCell>
                          <TableCell
                            className={
                              classes.tableCell + " " + classes.tableHeadCell
                            }
                          >
                            LAST NAME
                          </TableCell>
                          <TableCell
                            className={
                              classes.tableCell + " " + classes.tableHeadCell
                            }
                          >
                            GENDER
                          </TableCell>
                          <TableCell
                            className={
                              classes.tableCell + " " + classes.tableHeadCell
                            }
                          >
                            DATE OF BIRTH
                          </TableCell>
                          <TableCell
                            className={
                              classes.tableCell + " " + classes.tableHeadCell
                            }
                          >
                            ACCOUNT NO.
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
                            BVN
                          </TableCell>
                          <TableCell
                            className={
                              classes.tableCell + " " + classes.tableHeadCell
                            }
                          >
                            MOBILE NUMBER
                          </TableCell>
                          <TableCell
                            className={
                              classes.tableCell + " " + classes.tableHeadCell
                            }
                          >
                            EMAIL
                          </TableCell>
                          <TableCell
                            className={
                              classes.tableCell + " " + classes.tableHeadCell
                            }
                          >
                            ITEMS
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
                            LGA
                          </TableCell>
                          <TableCell
                            className={
                              classes.tableCell + " " + classes.tableHeadCell
                            }
                          >
                            ADDRESS
                          </TableCell>
                          <TableCell
                            className={
                              classes.tableCell + " " + classes.tableHeadCell
                            }
                          >
                            SCHOOL NAME
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {account.map(
                          ({
                            _id,
                            gender,
                            items,
                            firstName,
                            lastName,
                            birthday,
                            accountNumber,
                            bankName,
                            bvn,
                            phoneNumber,
                            date_created_acc,
                            email,
                            state,
                            address,
                            lga,
                            schoolName,
                            image,
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
                                      setAggregatorDetails({
                                        _id,
                                        gender,
                                        firstName,
                                        lastName,
                                        accountNumber,
                                        bankName,
                                        bvn,
                                        phoneNumber,
                                        email,
                                        state,
                                        date_created_acc,
                                        birthday,
                                        address,
                                        lga,
                                        schoolName,
                                        image,
                                      });
                                    }}
                                    onClick={handleClickPop}
                                  />
                                </TableCell>
                                <TableCell className={classes.tableCell}>
                                  {firstName}
                                </TableCell>
                                <TableCell className={classes.tableCell}>
                                  {lastName}
                                </TableCell>
                                <TableCell className={classes.tableCell}>
                                  {gender}
                                </TableCell>
                                <TableCell className={classes.tableCell}>
                                  {birthday}
                                </TableCell>
                                <TableCell className={classes.tableCell}>
                                  {accountNumber}
                                </TableCell>
                                <TableCell className={classes.tableCell}>
                                  {bankName}
                                </TableCell>
                                <TableCell className={classes.tableCell}>
                                  {bvn}
                                </TableCell>
                                <TableCell className={classes.tableCell}>
                                  {phoneNumber}
                                </TableCell>
                                <TableCell className={classes.tableCell}>
                                  {email}
                                </TableCell>
                                <TableCell className={classes.tableCell}>
                                  {items}
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
                                  {schoolName}
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
        <AddButton handleClickOpen={handleClickOpen} />
        <Toast message={message} />
      </GridContainer>
    </div>
  );
}
