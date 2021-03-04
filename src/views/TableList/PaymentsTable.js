import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import SaveAltIcon from '@material-ui/icons/SaveAlt';
// import { dataContext } from 'components/context/DataContext';
// import SpeedDial from 'components/SpeedDial/SpeedDial.js';
// icon components

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};

const useStyles = makeStyles(styles);

export default function TableList() {
  const classes = useStyles();
//   const { handleOpenModal } = useContext(dataContext);
  return (
    <div>
      <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary" className={classes.cardHeader}>
            <div>
              <h4 className={classes.cardTitleWhite}>Payments Details</h4>
              <p className={classes.cardCategoryWhite}>
                Monthly Report for payments
              </p>
            </div>
            <div>
                <SaveAltIcon fontSize="large" style={{marginRight: "30px", cursor: "pointer"}} />
            </div>
          </CardHeader>
          <CardBody>
            <Table 
              tableHeaderColor="primary"
              tableHead={["S/N", "COOK ID", "FULL NAME", "AMOUNT PER Pupil", "No of Pupils Fed", "PAYMENTS DATE", "STATE", "LOCAL GOVT."]}
              tableData={[
                ["1","C001", "Minerva Hooper Minerva", "50", "100", "November - December, 2020", "Lagos","Badagry"],
                ["2","C002", "Minerva Hooper Minerva", "50", "50", "November - December, 2020", "Lagos","Badagry"],
                ["3","C003", "Minerva Hooper Minerva", "50", "90", "November - December, 2020", "Lagos","Badagry"],
                ["4","C004", "Minerva Hooper Minerva", "50", "120", "November - December, 2020", "Lagos","Badagry"],
                ["5","C005", "Minerva Hooper Minerva", "50", "500", "November - December, 2020", "Lagos","Badagry"],
                ["6","C006", "Minerva Hooper Minerva", "50", "348", "November - December, 2020", "Lagos","Badagry"]
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
            
    </GridContainer>
    </div>
  );
}
