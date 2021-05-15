import React from "react";
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
import PublishIcon from '@material-ui/icons/Publish';
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



export default function SummaryReport({summaryTable}) {
  const classes = useStyles();

  return (
    <div>
      <GridContainer>
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
                  <PublishIcon fontSize="large" style={{marginRight: "30px", cursor: "pointer"}} />
              </div>
            </CardHeader>
            <CardBody>

            <Table className={classes.table}>
                
                <TableHead style={{color: "#9c27b0"}}>
                  <TableRow className={classes.tableHeadRow}>
                      <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>STATE</TableCell>
                      <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>PAYMENT TRANCHE</TableCell>
                      <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>FEEDING CYCLE</TableCell>
                      <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>DIFFERENCE FROM LAST MONTH'S TOTAL</TableCell>
                      <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>NO. OF CHILDREN</TableCell>
                      <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>NO. OF COOKS</TableCell>
                      <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>TOTAL AMOUNT TO COOKS</TableCell>
                      <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>TOTAL AMOUNT TO AGGREGATORS</TableCell>
                      <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>TOTAL AMOUNT TO STATE</TableCell>
                      <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Number of Schools</TableCell>
                  </TableRow>
                </TableHead>
              <TableBody>
                {summaryTable.map(({id, state, paymentTranch, feedCycle, diffrenceMonth, NoOfChildren, NoOfCook, totalAmountCook, totalAmountAggregator, totalAmountState, NumberOfPublicSchool}) => {
                  return (
                    <TableRow className={classes.tableBodyRow}>
                          <TableCell className={classes.tableCell}>{summaryTable.id}</TableCell>
                          <TableCell className={classes.tableCell}>{summaryTable.state}</TableCell>
                          <TableCell className={classes.tableCell}>{summaryTable.paymentTranch}</TableCell>
                          <TableCell className={classes.tableCell}>{summaryTable.feedCycle}</TableCell>
                          <TableCell className={classes.tableCell}>{summaryTable.diffrenceMonth}</TableCell>
                          <TableCell className={classes.tableCell}>{summaryTable.NoOfChildren}</TableCell>
                          <TableCell className={classes.tableCell}>{summaryTable.NoOfCook}</TableCell>
                          <TableCell className={classes.tableCell}>{summaryTable.totalAmountCook}</TableCell>
                          <TableCell className={classes.tableCell}>{summaryTable.totalAmountAggregator}</TableCell>
                          <TableCell className={classes.tableCell}>{summaryTable.totalAmountState}</TableCell>
                          <TableCell className={classes.tableCell}>{summaryTable.NumberOfPublicSchool}</TableCell>
                    </TableRow>
                  )
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
