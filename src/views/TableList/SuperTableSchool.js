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
import AddButton from 'components/AddButton/AddButton';
import Popover from 'components/Popover/Popover.js';
import DialogContainer from 'components/Dialog/DialogContainer.js';
import SchoolProfile from 'views/UserProfile/SchoolProfile';
import { dataContext } from 'components/context/DataContext';
import SpeedDialSchools from 'components/SpeedDialSchools/SpeedDialSchools.js';
// icon components
import ViewListIcon from '@material-ui/icons/ViewList';
import {getContent} from 'utils';

const useStyles = makeStyles(styles);

export default function TableAggregator(props) {
  const classes = useStyles();
  const { handleClickPop, handleClickOpen } = useContext(dataContext);
  const [loading, setLoading] = useState(false)
  const token = localStorage.getItem("token")
  const stateLogin = localStorage.getItem("state")

  const [account, setAccount] = useState([])

  useEffect(() => {
    setLoading(true);
      getContent(`https://nsfp.herokuapp.com/v1/schools?state=${stateLogin}`, token)
      .then(data=>setAccount(data.data))
    setLoading(false);
  }, [token, stateLogin]);

  const [schoolDetails, setSchoolDetails] = useState();

  return ( 
    <div>
      <DialogContainer children= {<SchoolProfile title="Add School's Data" sendButton="Submit" />} />
      <Popover children={<SpeedDialSchools details={schoolDetails} />} />
      <GridContainer> 
        <GridItem xs={12} sm={12} md={12}>
          {loading ? <div>Loading... Please wait</div> :
            <div>
              { account.length > 0 ?
                <Card>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <div>
                      <h4 className={classes.cardTitleWhite}>Schools Details</h4>
                      <p className={classes.cardCategoryWhite}>
                        List of all Schools
                      </p>
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
                      {account.map(({_id, name, contactPerson, phoneNumber, email, state, address, lga, totalPulpil, image, date_created_acc, status}) => {
                          return (
                            <TableRow key={_id} className={classes.tableBodyRow}>
                                <TableCell className={classes.tableCell}><ViewListIcon style={{cursor: "pointer"}}  onMouseUp={function(event){ setSchoolDetails({_id, name, contactPerson, phoneNumber, email, state, address, lga, totalPulpil, date_created_acc, image});}}  onClick={handleClickPop} /></TableCell>
                                <TableCell className={classes.tableCell}>{name}</TableCell>
                                <TableCell className={classes.tableCell}>{contactPerson}</TableCell>
                                <TableCell className={classes.tableCell}>{phoneNumber}</TableCell>
                                <TableCell className={classes.tableCell}>{email}</TableCell>
                                <TableCell className={classes.tableCell}>{state}</TableCell>
                                <TableCell className={classes.tableCell}>{lga}</TableCell>
                                <TableCell className={classes.tableCell}>{address}</TableCell>
                                <TableCell className={classes.tableCell}>{totalPulpil}</TableCell>
                            </TableRow>
                          )
                      })}
                    </TableBody>
                  </Table>
                  </CardBody>
                </Card>
              :
                <div>No Data yet</div> }
            </div>
          }
        </GridItem>
                <AddButton handleClickOpen={handleClickOpen}/>
      </GridContainer>
    </div>
  );
}
