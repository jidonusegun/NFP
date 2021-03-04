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
// import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import AddButton from 'components/AddButton/AddButton';
import Popover from 'components/Popover/Popover.js';
import DialogContainer from 'components/Dialog/DialogContainer.js';
import AddCooks from 'views/UserProfile/AddCooks';
import { dataContext } from 'components/context/DataContext';
import SpeedDialCook from 'components/SpeedDialCooks/SpeedDialCook.js';
// icon components
import ViewListIcon from '@material-ui/icons/ViewList';
import {getContent} from 'utils';
// import {Link, Router} from 'react-router-dom';


const useStyles = makeStyles(styles);

export default function TableList(props) {
  const classes = useStyles();
  const { handleClickPop, handleClickOpen } = useContext(dataContext);
  const [loading, setLoading] = useState(false)
  const [account, setAccount] = useState([]) 
  const token = localStorage.getItem("token")
  const stateLogin = localStorage.getItem("state")
  const lgaLogin = localStorage.getItem("lga")

  useEffect(() => {
    setLoading(true);
      getContent(`https://nsfp.herokuapp.com/v1/cooks?state=${stateLogin}&lga=${lgaLogin}`, token)
      .then(data=>setAccount(data.data))
    setLoading(false);
  }, [token, stateLogin, lgaLogin]);

  const [cookDetails, setCookDetails] = useState();

  console.log(account)

  return (
    <div>
      <DialogContainer children= {<AddCooks />} />
      <Popover children={<SpeedDialCook details={cookDetails} />} /> 
      <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        {loading ? <div>Loading... Please wait</div> :
          <div>
            { account.length > 0 ?
            <Card>
              <CardHeader color="primary" className={classes.cardHeader}>
                <div>
                  <h4 className={classes.cardTitleWhite}>Cooks Details</h4>
                  <p className={classes.cardCategoryWhite}>
                    List of all Cooks
                  </p>
                </div>
              </CardHeader>
              <CardBody> 
                    <Table className={classes.table}>
                  
                    <TableHead style={{color: "#9c27b0"}}>
                      <TableRow className={classes.tableHeadRow}>
                        <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>ACTION</TableCell>
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
                    {account.map(({_id, gender, firstName, lastName, birthday, accountNumber, bankName, bvn, phoneNumber, email, date_created_acc, state, address, lga, schoolName, image, status}) => {
                      
                      return (
                        <>
                          <TableRow key={_id} className={classes.tableBodyRow}>
                            <TableCell className={classes.tableCell}><ViewListIcon style={{cursor: "pointer"}} onMouseUp={function(event){ setCookDetails({_id, gender, firstName, lastName, accountNumber, bankName, bvn, phoneNumber, email, state, date_created_acc, address, birthday, lga, schoolName, image});}}  onClick={handleClickPop}/></TableCell>
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
                        </>
                      )
                    })}
                  </TableBody>
                </Table>
              </CardBody>
            </Card>
          :
            <div>No Data yet</div>}
          </div>
          
        }
      </GridItem>
            
    </GridContainer>

        <AddButton handleClickOpen={handleClickOpen} />
    </div>
  );
}
