import React, {useState, useEffect } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import SchoolIcon from '@material-ui/icons/School';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import AssessmentIcon from '@material-ui/icons/Assessment';
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import ViewListIcon from '@material-ui/icons/ViewList';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import { Link } from 'react-router-dom';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
// import { dataContext } from 'components/context/DataContext';
import {getContent, kCount} from 'utils';
import config from 'utils/config';

// import { bugs, website, server } from "variables/general.js";

import { dailySalesChart } from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  // const { token } = useContext(dataContext);
  const [school, setSchool] = useState([])
  const [cook, setCook] = useState([])
  const [aggregator, setAggregator] = useState([])
  const token = localStorage.getItem("token");
  const stateLogin = localStorage.getItem("state")
  const lgaLogin = localStorage.getItem("lga")
  const baseUrl = config.API_URL

  useEffect(() => {  
      getContent(`${baseUrl}/schools?state=${stateLogin}&lga=${lgaLogin}`, token)
      .then(data=>setSchool(data.data))

      getContent(`${baseUrl}/cooks?state=${stateLogin}&lga=${lgaLogin}`, token)
      .then(data=>setCook(data.data))

      getContent(`${baseUrl}/aggregators?state=${stateLogin}&lga=${lgaLogin}`, token)
      .then(data=>setAggregator(data.data))
  }, [token, stateLogin, lgaLogin]);

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <SchoolIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Schools</p>
              <h3 className={classes.cardTitle}>
                {kCount(school.length)}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}> 
                  <ViewListIcon />
                <Link to="/state-admin/schools" >
                  View All
                </Link>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Aggregators</p>
              <h3 className={classes.cardTitle}>{kCount(aggregator.length)}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <ViewListIcon />
                <Link to="/state-admin/aggregator">
                  View All
                </Link>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <RestaurantIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Cooks</p>
              <h3 className={classes.cardTitle}>{kCount(cook.length)}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <ViewListIcon />
                <Link to="/state-admin/cooks">
                  View All
                </Link>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <AssessmentIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Reports</p>
              <h3 className={classes.cardTitle} style={{color: "white"}}>0</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
              <ViewListIcon />
                <Link to="/state-admin/reports">
                  View All
                </Link>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
          <Card chart>
            <CardHeader color="success" style={{height: "20rem"}}>
              <ChartistGraph
                className="ct-chart"
                style={{height: "20rem"}}
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Monthly Report</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{" "}
                Increase in feeding rate
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 1 month ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
