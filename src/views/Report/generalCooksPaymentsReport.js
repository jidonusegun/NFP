import React, { useState } from "react";
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
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import { postContent } from "utils";
import userForm from "../../hooks/useForm";
import config from "utils/config";
import Loading from "components/isLoading";
// import { dataContext } from "components/context/DataContext";
// import SpeedDial from 'components/SpeedDial/SpeedDial.js';
// icon components

const useStyles = makeStyles(styles);

export default function NewlyRegisteredCooks({ cookPaymentDetails }) {
  const sendReport = userForm(sendToServer);
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");
  const baseUrl = config.API_URL;

  const state = cookPaymentDetails.map(({ state }) => {
    return state;
  });
  const lga = cookPaymentDetails.map(({ lga }) => {
    return lga;
  });
  const month = cookPaymentDetails.map(({ month }) => {
    return month;
  });

  async function sendToServer() {
    try {
      setIsLoading(true);
      const response = await postContent(
        `${baseUrl}/payment-report/sendtoadmin/${state[0]}/${lga[0]}/${month[0]}/COOK`,
        token
      );
      alert("Payments report has been sent");
      setIsLoading(false);
    } catch ({ message }) {
      alert(message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          {cookPaymentDetails.length > 0 ? (
            <Card>
              <CardHeader color="primary" className={classes.cardHeader}>
                <div>
                  <h4 className={classes.cardTitleWhite}>
                    Cook Payment Details
                  </h4>
                  <p className={classes.cardCategoryWhite}></p>
                </div>
                <div>
                  <a
                    href={`${baseUrl}/payment-report/downloadReport/${state[0]}/${lga[0]}/${month[0]}/COOK`}
                    target="_blank"
                    style={{ color: "white" }}
                    rel="noopener noreferrer"
                    download
                  >
                    <SaveAltIcon
                      fontSize="large"
                      style={{ marginRight: "30px", cursor: "pointer" }}
                    />
                  </a>
                  {isLoading && <Loading />}
                </div>
              </CardHeader>
              <CardBody>
                <Table className={classes.table}>
                  <TableHead style={{ color: "#9c27b0" }}>
                    <TableRow className={classes.tableHeadRow}>
                      <TableCell
                        className={
                          classes.tableCell + " " + classes.tableHeadCell
                        }
                      >
                        S/N
                      </TableCell>
                      <TableCell
                        className={
                          classes.tableCell + " " + classes.tableHeadCell
                        }
                      >
                        START DATE
                      </TableCell>
                      <TableCell
                        className={
                          classes.tableCell + " " + classes.tableHeadCell
                        }
                      >
                        END DATE
                      </TableCell>
                      <TableCell
                        className={
                          classes.tableCell + " " + classes.tableHeadCell
                        }
                      >
                        AMOUNT PER MEAL
                      </TableCell>
                      <TableCell
                        className={
                          classes.tableCell + " " + classes.tableHeadCell
                        }
                      >
                        NO. OF PUPILS FED
                      </TableCell>
                      <TableCell
                        className={
                          classes.tableCell + " " + classes.tableHeadCell
                        }
                      >
                        NO. OF DAYS FED
                      </TableCell>
                      <TableCell
                        className={
                          classes.tableCell + " " + classes.tableHeadCell
                        }
                      >
                        MONTH
                      </TableCell>
                      <TableCell
                        className={
                          classes.tableCell + " " + classes.tableHeadCell
                        }
                      >
                        CATEGORY
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
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cookPaymentDetails.map(
                      ({
                        status,
                        _id,
                        state,
                        lga,
                        userType,
                        month,
                        startDate,
                        endDate,
                        amountPerMeal,
                        userId,
                        pulpilFeed,
                        Days,
                      }) => {
                        // id, noOfCook, costPerMeal, daysFeed, NoOfChildren, amountToCook
                        return status === "SENT" && userType === "COOK" ? (
                          <TableRow key={_id} className={classes.tableBodyRow}>
                            <TableCell className={classes.tableCell}>
                              {userId}
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                              {startDate}
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                              {endDate}
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                              {amountPerMeal}
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                              {pulpilFeed}
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                              {Days}
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                              {month}
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                              {userType}
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                              {state}
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                              {lga}
                            </TableCell>
                          </TableRow>
                        ) : null;
                      }
                    )}
                  </TableBody>
                </Table>
              </CardBody>
            </Card>
          ) : (
            <div>No Data yet</div>
          )}
        </GridItem>
      </GridContainer>
    </div>
  );
}
