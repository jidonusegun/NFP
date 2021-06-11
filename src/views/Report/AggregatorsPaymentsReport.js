import React, {useState} from "react";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js"; 
import PublishIcon from '@material-ui/icons/Publish';
import CustomInput from "components/CustomInput/CustomInput.js";
import { postContent } from "utils";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select"; 
import userForm from "../../hooks/useForm";
import config from 'utils/config';
// import { dataContext } from "components/context/DataContext";
// import SpeedDial from 'components/SpeedDial/SpeedDial.js';
// icon components

// const styles = {
//   cardCategoryWhite: {
//     "&,& a,& a:hover,& a:focus": {
//       color: "rgba(255,255,255,.62)",
//       margin: "0",
//       fontSize: "14px",
//       marginTop: "0",
//       marginBottom: "0"
//     },
//     "& a,& a:hover,& a:focus": {
//       color: "#FFFFFF"
//     }
//   },
//   cardTitleWhite: {
//     color: "#FFFFFF",
//     marginTop: "0px",
//     minHeight: "auto",
//     fontWeight: "300",
//     fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
//     marginBottom: "3px",
//     textDecoration: "none",
//     "& small": {
//       color: "#777",
//       fontSize: "65%",
//       fontWeight: "400",
//       lineHeight: "1"
//     }
//   },
//   cardHeader: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center", 
//   },
// };

const useStyles = makeStyles(styles);

export default function NewlyRegisteredAggregators({aggregatorPaymentDetails, setMonth, stateLogin}) {
  const sendReport = userForm(sendToServer);
  const addMonth = userForm();
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false)
  // const [status, setStatus] = useState({active: "", category: ""})
  var token = localStorage.getItem("token");
  const baseUrl = config.API_URL

  console.log(token)

  const state = aggregatorPaymentDetails.map(({state}) => {return state} )
  const lga = aggregatorPaymentDetails.map(({lga}) => { return lga} )
  const month = aggregatorPaymentDetails.map(({month}) => { return month} )

  async function sendToServer() {
    try {
      setIsLoading(true)
      const {message} = await postContent(`${baseUrl}/payment-report/sendtoadmin?state=${stateLogin}&month=${addMonth.values.month}&userType=AGGREGATOR`, {}, token);
      alert(message)
      setIsLoading(false)
    } catch ({message}) {
      alert(message)
    }
    finally {
      setIsLoading(false)
    }
  }

  setMonth(addMonth.values.month)

  return (
    <div>
      <GridContainer>
      <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
      <div style={{marginBottom: '1rem', marginLeft: '3rem'}}>
        <CustomInput
          labelText="Select Month"
          id="month"
          inputProps={{
            type: "month",
            name: "month",
            onChange: (e) => addMonth.getData(e),
          }}
          formControlProps={{
            fullWidth: true,

          }}
        />
        </div>
        </GridItem>
      </GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        { aggregatorPaymentDetails.length > 0 ?
        <Card>
          <CardHeader color="primary" className={classes.cardHeader}>
            <div>
              <h4 className={classes.cardTitleWhite}>Aggregator Payment Details</h4>
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
                    <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>COMPANY'S NAME</TableCell>
                    <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>STATE</TableCell>
                    <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>PHONE NUMBER</TableCell>
                    <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>ITEM TO SUPPLY</TableCell>
                    <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>BANK NAME</TableCell>
                    <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>ACCOUNT NUMBER</TableCell>
                    <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>TIN</TableCell>
                    <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>UNIT PRICE</TableCell>
                    <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>FREQUENCY OF SUPPLY</TableCell>
                    <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>START DATE</TableCell>
                    <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>END DATE</TableCell>
                    <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>NO. OF PUPILS FED</TableCell>
                    <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>NO. OF DAYS FED</TableCell>
                    <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>MONTH</TableCell>
                    <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>TOTAL AMOUNT TO PAY</TableCell>
                    <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>CATEGORY</TableCell>
                </TableRow>
              </TableHead>
            <TableBody>
              {aggregatorPaymentDetails.map(({status, _id, state, tin, bankName, acctNumber, dayForConsumption, companyName, itemsToSupply, userType, month, startDate, endDate, unitPrice, userId, pulpilFeed, phoneNumber, frequencyOfSupply, totalAmountToPay, userRecord, Days}) => {
                // id, companyName, item, consumption, Cost, noOfChildren, total
                return status === "PENDING" && userType === "AGGREGATOR" ?
                  <TableRow key={_id} className={classes.tableBodyRow}>
                        <TableCell className={classes.tableCell}>{userRecord.companyName}</TableCell>
                        <TableCell className={classes.tableCell}>{state}</TableCell>
                        <TableCell className={classes.tableCell}>{userRecord.phoneNumber}</TableCell>
                        <TableCell className={classes.tableCell}>{userRecord.itemsToSupply}</TableCell>
                        <TableCell className={classes.tableCell}>{userRecord.bankName}</TableCell>
                        <TableCell className={classes.tableCell}>{userRecord.acctNumber}</TableCell>
                        <TableCell className={classes.tableCell}>{userRecord.tin}</TableCell>
                        <TableCell className={classes.tableCell}>{userRecord.unitPrice}</TableCell>
                        <TableCell className={classes.tableCell}>{frequencyOfSupply}</TableCell>
                        <TableCell className={classes.tableCell}>{startDate}</TableCell>
                        <TableCell className={classes.tableCell}>{endDate}</TableCell>
                        <TableCell className={classes.tableCell}>{pulpilFeed}</TableCell>
                        {/* <TableCell className={classes.tableCell}>{pulpilFeed}</TableCell> */}
                        <TableCell className={classes.tableCell}>{Days}</TableCell>
                        <TableCell className={classes.tableCell}>{month}</TableCell>
                        <TableCell className={classes.tableCell}>{totalAmountToPay}</TableCell>
                        <TableCell className={classes.tableCell}>{userType}</TableCell>
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
