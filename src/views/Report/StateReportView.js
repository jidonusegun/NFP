import React, { useContext, useState, useEffect } from "react";
// components
import {getContent} from 'utils';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import NewAggregator from 'views/Report/stateNewlyAddedAggregators';
import SchoolIcon from '@material-ui/icons/School';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import NewSchool from 'views/Report/stateNewlyAddedSchools';
import NewCook from 'views/Report/stateNewlyAddedCooks'; 
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Popover from 'components/Popover/Popover.js';
import DialogContainer from 'components/Dialog/DialogContainer.js';
import AdminUser from 'views/UserProfile/AdminUser';
import { dataContext } from 'components/context/DataContext';
import SpeedDial from 'components/SpeedDial/SpeedDial.js';
import ImageCard from 'components/ImageCard/ImageCard';
import {Link} from 'react-router-dom';
// icon components

const useStyles = makeStyles((theme) => ({
    cardContainer: {
        // display: "grid",
        // ggridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        // gridColumnGap: "1rem",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    cardContent: {
        flex: "0 0 100%",
        [theme.breakpoints.up('sm')]: {
            flex: `0 0 calc(33.3% - 1rem)`,
        },
        [theme.breakpoints.up('md')]: {
            flex: "0 0 calc(20% - 1rem)",
        }
    },
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
  
}));

export default function StateReportView(props) {
  const classes = useStyles();
  const { handleClickPop, stateView } = useContext(dataContext); 
  const [cook, setCook] = useState([])
  const [school, setSchool] = useState([])
  const [loading, setLoading] = useState(false) 
  const [aggregator, setAggregator] = useState([]) 
  const token = localStorage.getItem("token")

  useEffect(() => {
    setLoading(true);
    getContent("https://nsfp.herokuapp.com/v1/cooks?state=lagos&lga=badagry&status=PENDING", token)
    .then(data=>setCook(data.data))

    getContent("https://nsfp.herokuapp.com/v1/aggregators?state=lagos&lga=badagry&status=PENDING", token)
    .then(data=>setAggregator(data.data))

    getContent("https://nsfp.herokuapp.com/v1/schools?state=lagos&lga=badagry&status=PENDING", token)
    .then(data=>setSchool(data.data))
    setLoading(false);
  }, [token]);

  const name = props.location.state.state;
  return (
    <div>
      <Popover children={<SpeedDial />} />
      <DialogContainer children= {<AdminUser title="Add Data" sendButton="Submit" />} />
      <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary" className={classes.cardHeader}>
            <div>
              <h4 className={classes.cardTitleWhite}>{name} State Report</h4>
              <p className={classes.cardCategoryWhite}>
              </p>
            </div>
            
          </CardHeader>
          <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <CustomTabs
              headerColor="danger"
              tabs={[
                {
                  tabName: "Schools",
                  tabIcon: SchoolIcon,
                  tabContent: (
                    <div>
                      {loading ? <div>Loading... Please wait</div> : <NewSchool schoolsList={school} />}
                    </div>
                  )
                },
                {
                  tabName: "Cooks",
                  tabIcon: RestaurantIcon,
                  tabContent: (
                    <div>
                      {loading ? <div>Loading... Please wait</div> : <NewCook cooksList={cook} />}
                    </div>
                  )
                },
                {
                  tabName: "Aggregators",
                  tabIcon: RestaurantIcon,
                  tabContent: (
                    <div>
                      {loading ? <div>Loading... Please wait</div> : <NewAggregator aggregatorsList={aggregator} />}
                    </div>
                  )
                }
              ]}
            />
          </GridItem>
        </GridContainer>
        </Card>
      </GridItem>
            
    </GridContainer>
    </div>
  );
}
