import React, {useState, useContext} from "react";
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
import ViewListIcon from '@material-ui/icons/ViewList';
import Popover from 'components/Popover/Popover.js';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PublishIcon from '@material-ui/icons/Publish';
import { patchContent } from "utils"; 
import { dataContext } from "components/context/DataContext";
import userForm from "../../hooks/useForm";
import config from 'utils/config';
// import { dataContext } from "components/context/DataContext";
// icon components

const useStyles = makeStyles(styles);

export default function NewlyRegisteredAggregators({aggregatorsList}) {
  const sendReport = userForm();
  const rejectCook = userForm(sendRejectToServer);
  const approveCook = userForm(sendToServer);
  const classes = useStyles();
  const [savedId, setSavedId] = useState()
  const baseUrl = config.API_URL
  const token = localStorage.getItem("token")
  const { handleClickPop, handleClosePop } = useContext(dataContext);
  const stateLogin = localStorage.getItem("stateAdminState")
    const lgaLogin = localStorage.getItem("stateAdminLga")

    async function sendToServer() {
      try {
        const response = await patchContent(`${baseUrl}/aggregator/${savedId}/approve`, {}, token);
      console.log(response);
      handleClosePop()
      } catch ({message}) {
        alert(message)
      }
      
    }

    async function sendRejectToServer() {
      try {
        const response = await patchContent(`${baseUrl}/aggregator/${savedId}/reject`, token);
      console.log(response);
      handleClosePop()
      } catch ({message}) {
        alert(message)
      }
    }

  return (
    <div>
      <Popover>
          <List>
            <ListItem button>
              <ListItemText primary="Approve" onClick={approveCook.submit} />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Reject" onClick={rejectCook.submit} />
            </ListItem>
          </List>
      </Popover>
      <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        { aggregatorsList.length > 0 ?
        <Card>
          <CardHeader color="primary" className={classes.cardHeader}>
            <div>
              <h4 className={classes.cardTitleWhite}>Newly Registered Aggregators</h4>
              <p className={classes.cardCategoryWhite}>
              </p>
            </div>
            <div>
                <PublishIcon fontSize="large" style={{marginRight: "30px", cursor: "pointer"}} onClick={sendReport.submit} />
            </div>
          </CardHeader>
          <CardBody>
          <Table className={classes.table}>
              
              <TableHead style={{color: "#9c27b0"}}>
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
              {aggregatorsList.map(({acctNumber, bankName, companyName, dayForConsumption, frequencyOfSupply, numberOfDaysPerCycle, numberOfPulpilFed, phoneNumber, registeredBy, state, status, tin, unitPrice, _id,}) => {  
                return status === "PENDING" ?
                  <TableRow key={_id} className={classes.tableBodyRow}>
                    {/* <TableCell className={classes.tableCell} style={{display: "none"}}><input type="number" id="id" value={_id} style={{display: "none"}} onChange={sendReport.getData()} />{_id}</TableCell> */}
                    <TableCell className={classes.tableCell}>
                      <ViewListIcon style={{cursor: "pointer"}} onMouseUp={function(event){setSavedId(_id)}} onClick={handleClickPop} /></TableCell>
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
                : null
              })}
            </TableBody>
          </Table>
          </CardBody>
        </Card>
        :
          <div>No Data yet</div> }
      </GridItem>
    </GridContainer>
    </div>
  );
}
