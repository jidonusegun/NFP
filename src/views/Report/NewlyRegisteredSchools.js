import React, {useContext, useState } from "react";
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
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import Popover from 'components/Popover/Popover.js';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { dataContext } from 'components/context/DataContext';
import ViewListIcon from '@material-ui/icons/ViewList';
import userForm from "../../hooks/useForm";
import {patchContent} from 'utils';
import config from 'utils/config';



const useStyles = makeStyles(styles);

export default function NewlyRegisteredSchools({schoolsList}) {
  const classes = useStyles();
//   const { handleOpenModal } = useContext(dataContext);
const { handleClickPop, handleClosePop } = useContext(dataContext);
// const [sendData, setSendData] = useState();
const token = localStorage.getItem("token");
const [savedId, setSavedId] = useState()
const approveSchool = userForm(sendToServer);
const baseUrl = config.API_URL

async function sendToServer() {
  handleClosePop()
const response = await patchContent(`${baseUrl}/school/${savedId}/approve`, token);
// addCook.reset();
console.log(response);
//   const body = await result;
//   console.log(body);
}

  return (
    <div>
      <Popover>
          <List>
            <ListItem button>
              <ListItemText primary="Approve" onClick={approveSchool.submit} />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Reject" onClick={handleClosePop} />
            </ListItem>
          </List>
      </Popover>
      <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        { schoolsList.length > 0 ?
          <Card>
            <CardHeader color="primary" className={classes.cardHeader}>
              <div>
                <h4 className={classes.cardTitleWhite}>Newly Registered Schools</h4>
                <p className={classes.cardCategoryWhite}>
                </p>
              </div>
              <div>
                  <SaveAltIcon fontSize="large" style={{marginRight: "30px", cursor: "pointer"}} />
              </div>
            </CardHeader>
            <CardBody>
            <Table className={classes.table}>
                
                  <TableHead style={{color: "#9c27b0"}}>
                    <TableRow className={classes.tableHeadRow}>
                      <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>ACTION</TableCell>
                        <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>School Name</TableCell>
                        <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Contact Person</TableCell>
                        <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Contact Phone No.</TableCell>
                        <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Email</TableCell>
                        <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>State</TableCell>
                        <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>LGA</TableCell>
                        <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Address</TableCell>
                        <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>No of Pupils</TableCell>
                    </TableRow>
                  </TableHead>
              <TableBody>
                {schoolsList.map(({_id, name, contactPerson, phoneNumber, email, state, address, lga, totalPulpil, image, date_created_acc, status}) => {
                  return status === "AWAITING_APPROVAL" ? 
                    <TableRow key={_id} className={classes.tableBodyRow}>
                    <TableCell className={classes.tableCell}>
                      <input type="number" id="approve" name="approve" onChange={approveSchool.getData} value={_id} style={{display: "none"}}/>
                      <ViewListIcon style={{cursor: "pointer"}} onMouseUp={function(event){setSavedId(_id)}} onClick={handleClickPop} /></TableCell>
                    <TableCell className={classes.tableCell}>{name}</TableCell>
                    <TableCell className={classes.tableCell}>{contactPerson}</TableCell>
                    <TableCell className={classes.tableCell}>{phoneNumber}</TableCell>
                    <TableCell className={classes.tableCell}>{email}</TableCell>
                    <TableCell className={classes.tableCell}>{state}</TableCell>
                    <TableCell className={classes.tableCell}>{lga}</TableCell>
                    <TableCell className={classes.tableCell}>{address}</TableCell>
                    <TableCell className={classes.tableCell}>{totalPulpil}</TableCell>
                    </TableRow>
                  : <div>No Data yet</div>
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
