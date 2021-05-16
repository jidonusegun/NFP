import React, { useContext } from "react";
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
import AddButton from 'components/AddButton/AddButton';
import Popover from 'components/Popover/Popover.js';
import DialogContainer from 'components/Dialog/DialogContainer.js';
import AdminUser from 'views/UserProfile/AdminUser';
import { dataContext } from 'components/context/DataContext';
import SpeedDialStateAdmin from 'components/SpeedDialStateAdmin/SpeedDialStateAdmin.js';
// icon components
import ViewListIcon from '@material-ui/icons/ViewList';
import config from 'utils/config';

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

export default function TableStateAdmin() {
  const classes = useStyles();
  const { handleClickPop, handleClickOpen } = useContext(dataContext);
  return (
    <div>
      <Popover children={<SpeedDialStateAdmin />} />
      <DialogContainer children= {<AdminUser title="Add Data" sendButton="Submit" />} />
      <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary" className={classes.cardHeader}>
            <div>
              <h4 className={classes.cardTitleWhite}>State Admin Details</h4>
              <p className={classes.cardCategoryWhite}>
                List of all State Admins
              </p>
            </div>
            <div>
                <SaveAltIcon fontSize="large" style={{marginRight: "30px", cursor: "pointer"}} />
            </div>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Id", "Name", "", "", "", "", "", "", "", "", "", "", "", "", "Action"]}
              tableData={[
                ["1", "Dakota Rice Dakota Rice Dakota Rice Dakota Rice Dakota Rice Dakota Rice", "", "", "", "", "", "", "", "", "", "", "", "", <ViewListIcon onClick={handleClickPop} style={{cursor: "pointer"}} />],
                ["2", "Minerva Hooper", "", "", "", "", "", "", "", "", "", "", "", "", <ViewListIcon onClick={handleClickPop} style={{cursor: "pointer"}} />],
                ["3", "Sage Rodriguez", "", "", "", "", "", "", "", "", "", "", "", "", <ViewListIcon onClick={handleClickPop} style={{cursor: "pointer"}} />],
                ["4", "Philip Chaney", "", "", "", "", "", "", "", "", "", "", "", "", <ViewListIcon onClick={handleClickPop} style={{cursor: "pointer"}} />],
                ["5", "Doris Greene", "", "", "", "", "", "", "", "", "", "", "", "", <ViewListIcon onClick={handleClickPop} style={{cursor: "pointer"}} />],
                ["6", "Mason Porter", "", "", "", "", "", "", "", "", "", "", "", "", <ViewListIcon onClick={handleClickPop} style={{cursor: "pointer"}} />]
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
            
    </GridContainer>

        <AddButton handleClickOpen={handleClickOpen} />
    </div>
  );
}
