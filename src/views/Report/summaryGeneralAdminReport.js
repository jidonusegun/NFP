import React, {useState, useEffect} from "react";
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
import Loading from "components/isLoading";
import CustomInput from "components/CustomInput/CustomInput.js";
import config from 'utils/config';
import { postContent, getContent } from "utils"; 
import userForm from "../../hooks/useForm";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import { CSVLink } from "react-csv";
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




export default function SummaryReport({summaryTable, stateName, setMonth}) {
  const classes = useStyles();
  const addMonth = userForm();
  const token = localStorage.getItem("token");
  const [downloadCook, setDownloadCook] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const baseUrl = config.API_URL

  const state = summaryTable.map(({ state }) => {
    return state;
  });
  const lga = summaryTable.map(({ lga }) => {
    return lga;
  });
  const month = summaryTable.map(({ month }) => {
    return month;
  });


  useEffect(() => {
    getContent(`${baseUrl}/payment-report/downloadReport?state=${stateName}&userType=COOK&month=${addMonth.values.month}`, token)
    .then(data=>setDownloadCook(data))
  },[token, addMonth.values.month, stateName])

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
        {summaryTable?.length > 0 ? 
          <Card>
            <CardHeader color="primary" className={classes.cardHeader}>
              <div>
                <h4 className={classes.cardTitleWhite}>Summary Table</h4>
                <p className={classes.cardCategoryWhite}>
                </p>
              </div>
              <div>
                <CSVLink data={downloadCook}>
                    <SaveAltIcon
                      fontSize="large"
                      style={{ marginRight: "30px", cursor: "pointer", color: 'white' }}
                    />
                </CSVLink>
              </div>
            </CardHeader>
            <CardBody>

            <Table className={classes.table}>
                
                <TableHead style={{color: "#9c27b0"}}>
                  <TableRow className={classes.tableHeadRow}>
                      <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>STATE</TableCell>
                      <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>MONTH</TableCell>
                      <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>PAYMENT TRANCHE</TableCell>
                      <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>FEEDING CYCLE</TableCell>
                      <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>DIFFERENCE FROM LAST MONTH TOTAL</TableCell>
                      <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>TOTAL NO. SCHOOLS</TableCell>
                      <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>TOTAL NO. OF CHILDREN</TableCell>
                      <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>TOTAL NO. OF COOKS</TableCell>
                      <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>TOTAL AMOUNT TO COOKS</TableCell>
                      <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>TOTAL NO. OF AGGREGATORS</TableCell>
                      <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>TOTAL AMOUNT TO AGGREGATORS</TableCell>
                      <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>TOTAL AMOUNT TO STATE</TableCell>
                  </TableRow>
                </TableHead>
              <TableBody>
                {summaryTable.map(({paymentTranch, feedingCycle, diffLastMonthTotal, numChildren,
                  numCooks, numAggregators, numSchools, totalAmountCook, totalAmountAggregator,
                  totalAmountState, status, _id, state, month,}) => {
                  return status === "SENT" ?
                  <TableRow className={classes.tableBodyRow}>
                        <TableCell className={classes.tableCell}>{state}</TableCell>
                        <TableCell className={classes.tableCell}>{month}</TableCell>
                        <TableCell className={classes.tableCell}>{paymentTranch}</TableCell>
                        <TableCell className={classes.tableCell}>{feedingCycle}</TableCell>
                        <TableCell className={classes.tableCell}>{diffLastMonthTotal}</TableCell>
                        <TableCell className={classes.tableCell}>{numSchools}</TableCell>
                        <TableCell className={classes.tableCell}>{numChildren}</TableCell>
                        <TableCell className={classes.tableCell}>{numCooks}</TableCell>
                        <TableCell className={classes.tableCell}>{totalAmountCook}</TableCell>
                        <TableCell className={classes.tableCell}>{numAggregators}</TableCell>
                        <TableCell className={classes.tableCell}>{totalAmountAggregator}</TableCell>
                        <TableCell className={classes.tableCell}>{totalAmountState}</TableCell>
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
