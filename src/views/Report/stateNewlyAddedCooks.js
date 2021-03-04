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
import { patchContent } from "utils"; 
import userForm from "../../hooks/useForm";
// import { dataContext } from "components/context/DataContext";



const useStyles = makeStyles(styles);

export default function NewlyRegisteredCooks({cooksList}) {
  const sendReport = userForm(sendToServer);
  const classes = useStyles();

  const token = localStorage.getItem("token")
  const stateLogin = localStorage.getItem("stateAdminState")
    const lgaLogin = localStorage.getItem("stateAdminLga")

  async function sendToServer() {
    console.log(sendReport.values);
    // console.log(sendReport.formData());
    const response = await patchContent(`https://nsfp.herokuapp.com/v1/cook/${stateLogin}/${lgaLogin}/send-for-approval`, sendReport.values, token);
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
        { cooksList.length > 0 ?
          <Card>
            <CardHeader color="primary" className={classes.cardHeader}>
              <div>
                <h4 className={classes.cardTitleWhite}>Newly Registered Cooks</h4>
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
                      {/* <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>S/N</TableCell> */}
                      <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>FIRST NAME</TableCell>
                      <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>LAST NAME</TableCell>
                      <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>GENDER</TableCell>
                      <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>DATE OF BIRTH</TableCell>
                      <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>ACCOUNT NO.</TableCell>
                      <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>BANK NAME</TableCell>
                      <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>BVN</TableCell>
                      <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>MOBILE NUMBER</TableCell>
                      <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>EMAIL</TableCell>
                      <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>STATE</TableCell>
                      <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>ADDRESS</TableCell>
                      <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>LGA</TableCell>
                      <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>SCHOOL NAME</TableCell>
                    </TableRow>
                  </TableHead>
              <TableBody>
                {cooksList.map(({_id, gender, firstName, lastName, birthday, accountNumber, bankName, bvn, phoneNumber, email, date_created_acc, state, address, lga, schoolName, image, status}) => {
                  return  status === "PENDING" ?
                    <TableRow key={_id} className={classes.tableBodyRow}>
                      {/* <TableCell className={classes.tableCell} style={{display: "none"}}><input type="number" id="id" value={_id} style={{display: "none"}} onChange={sendReport.getData()} />{_id}</TableCell> */}
                      <TableCell className={classes.tableCell}>{firstName}</TableCell>
                      <TableCell className={classes.tableCell}>{lastName}</TableCell>
                      <TableCell className={classes.tableCell}>{gender}</TableCell>
                      <TableCell className={classes.tableCell}>{birthday}</TableCell>
                      <TableCell className={classes.tableCell}>{accountNumber}</TableCell>
                      <TableCell className={classes.tableCell}>{bankName}</TableCell>
                      <TableCell className={classes.tableCell}>{bvn}</TableCell>
                      <TableCell className={classes.tableCell}>{phoneNumber}</TableCell>
                      <TableCell className={classes.tableCell}>{email}</TableCell>
                      <TableCell className={classes.tableCell}>{state}</TableCell>
                      <TableCell className={classes.tableCell}>{address}</TableCell>
                      <TableCell className={classes.tableCell}>{lga}</TableCell>
                      <TableCell className={classes.tableCell}>{schoolName}</TableCell>
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
