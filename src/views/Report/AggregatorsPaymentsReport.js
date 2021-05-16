import React from "react";
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
import { postContent } from "utils"; 
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

export default function NewlyRegisteredAggregators({aggregatorPaymentDetails}) {
  const sendReport = userForm(sendToServer);
  const classes = useStyles();
  // const [status, setStatus] = useState({active: "", category: ""})
  var token = localStorage.getItem("token");
  const baseUrl = config.API_URL

  async function sendToServer() {
    console.log(sendReport.values);
    // console.log(sendReport.formData());
    const response = await postContent(`${baseUrl}/`,
      sendReport.values, token);
    // sendReport.reset();

    alert("Your report has been sent")
  console.log(response);
  //   const body = await result;
  //   console.log(body);
  }

  return (
    <div>
      <GridContainer>
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
                    <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>S/N</TableCell>
                    <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>START DATE</TableCell>
                    <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>END DATE</TableCell>
                    <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>AMOUNT PER MEAL</TableCell>
                    <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>NO. OF PUPILS FED</TableCell>
                    <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>NO. OF DAYS FED</TableCell>
                    <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>MONTH</TableCell>
                    <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>CATEGORY</TableCell>
                    <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>STATE</TableCell>
                    <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>LGA</TableCell>
                </TableRow>
              </TableHead>
            <TableBody>
              {aggregatorPaymentDetails.map(({status, _id, state, lga, userType, month, startDate, endDate, amountPerMeal, userId, pulpilFeed, Days}) => {
                // id, companyName, item, consumption, Cost, noOfChildren, total
                return status === "PENDING" && userType === "AGGREGATOR" ?
                  <TableRow key={_id} className={classes.tableBodyRow}>
                        <TableCell className={classes.tableCell}>{userId}</TableCell>
                        <TableCell className={classes.tableCell}>{startDate}</TableCell>
                        <TableCell className={classes.tableCell}>{endDate}</TableCell>
                        <TableCell className={classes.tableCell}>{amountPerMeal}</TableCell>
                        <TableCell className={classes.tableCell}>{pulpilFeed}</TableCell>
                        <TableCell className={classes.tableCell}>{Days}</TableCell>
                        <TableCell className={classes.tableCell}>{month}</TableCell>
                        <TableCell className={classes.tableCell}>{userType}</TableCell>
                        <TableCell className={classes.tableCell}>{state}</TableCell>
                        <TableCell className={classes.tableCell}>{lga}</TableCell>
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
