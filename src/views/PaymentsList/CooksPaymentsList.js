import React, {useState, useEffect } from 'react';
// @material-ui/core components
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
// import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
// import SaveAltIcon from '@material-ui/icons/SaveAlt';
import { makeStyles } from '@material-ui/core/styles';
// import { dataContext } from "components/context/DataContext";
import {getContent} from 'utils';

const useStyles = makeStyles(styles); 
// const userData = [];

export default function CooksPaymentsList({ state, lga, userData, handlePaymentChange }) {
    const classes = useStyles();
    const [account, setAccount] = useState([])
    // const [paymentInput, setPaymentInput] = useState({pulpilFeed: "", Days: ""})
    // const [ids, setIds] = useState([])
    // const { token } = useContext(dataContext);
    const token = localStorage.getItem("token") 

  useEffect(() => {
      getContent(`https://nsfp.herokuapp.com/v1/cooks/${state}/${lga}/payment-list`, token)
    .then(data=>{
        setAccount(data.data);
        
        data.data.map(({_id},index)=>userData[index] = {userId:_id, pulpilFeed:0, Days:0})
    })
  }, [token, state, lga, userData]);

//   const handlePaymentChange = (e) => {
//     setPaymentInput({[e.target.name]: e.target.value});
//   }

  

    return (
        <div className={classes.root} >
            <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                { account.length > 0 ?
                <Card>
                    <CardHeader color="primary" className={classes.cardHeader}>
                    <div>
                        <h4 className={classes.cardTitleWhite}>Cooks</h4>
                        <p className={classes.cardCategoryWhite}>
                        List of all Cooks
                        </p>
                    </div>
                    <div>
                        {/* <SaveAltIcon fontSize="large" style={{marginRight: "30px", cursor: "pointer"}} /> */}
                    </div>
                    </CardHeader>
                    <CardBody>
                        <Table className={classes.table}>
                        
                        <TableHead style={{color: "#9c27b0"}}>
                            <TableRow className={classes.tableHeadRow}>
                            <TableCell width="10%" className={classes.tableCell + " " + classes.tableHeadCell}>ID</TableCell>
                            <TableCell width="10%" className={classes.tableCell + " " + classes.tableHeadCell}>FIRST NAME</TableCell>
                                <TableCell width="10%" className={classes.tableCell + " " + classes.tableHeadCell}>LAST NAME</TableCell>
                                <TableCell width="10%" className={classes.tableCell + " " + classes.tableHeadCell}>PHONE NUMBER</TableCell>
                                <TableCell width="10%" className={classes.tableCell + " " + classes.tableHeadCell}>ACCOUNT NUMBER</TableCell>
                                <TableCell width="10%" className={classes.tableCell + " " + classes.tableHeadCell}>BVN</TableCell>
                                <TableCell width="10%" className={classes.tableCell + " " + classes.tableHeadCell}>BANK NAME</TableCell>
                                <TableCell width="10%" className={classes.tableCell + " " + classes.tableHeadCell}>SCHOOL NAME</TableCell>
                                <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>NO. OF PUPILS FED</TableCell>
                                <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>NO. OF DAY(S) FED</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {account.map(({_id, firstName, lastName, phoneNumber, accountNumber, bvn, bankName, schoolName}, index) => {
                            // const name = {title, first_name, middle_name, last_name}
                            return (
                            <TableRow key={_id} className={classes.tableBodyRow}>
                                    <TableCell className={classes.tableCell}>{_id}</TableCell>

                                    <TableCell className={classes.tableCell}>{firstName}</TableCell>
                                    <TableCell className={classes.tableCell}>{lastName}</TableCell>
                                    <TableCell className={classes.tableCell}>{phoneNumber}</TableCell>
                                    <TableCell className={classes.tableCell}>{accountNumber}</TableCell>
                                    <TableCell className={classes.tableCell}>{bvn}</TableCell>
                                    <TableCell className={classes.tableCell}>{bankName}</TableCell>
                                    <TableCell className={classes.tableCell}>{schoolName}</TableCell>

                                    <TableCell className={classes.tableCell}><input style={{border: '1px solid black', height: '30px'}} type="number"  name="pulpilFeed" id="pulpilFeed" onChange={(e)=>{
                                        userData[index].pulpilFeed = e.target.value
                                    }} onInput={handlePaymentChange}/></TableCell>

                                    <TableCell className={classes.tableCell}><input style={{border: '1px solid black', height: '30px'}} type="number" name="Days" id="Days" onChange={(e)=>{userData[index]['Days'] = e.target.value }} onInput={handlePaymentChange} /></TableCell>
                            </TableRow>
                            )
                        })}
                        </TableBody>
                    </Table>
                    </CardBody>
                </Card>
                :
                <div>No Data yet</div>}
            </GridItem>
            </GridContainer>
        </div>
    )
}
