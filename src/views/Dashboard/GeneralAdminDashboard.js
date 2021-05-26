import React, {useState, useEffect } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import PaymentIcon from '@material-ui/icons/Payment';
import AssessmentIcon from '@material-ui/icons/Assessment';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import PersonIcon from '@material-ui/icons/Person';
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

import {dailySalesChart} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function GeneralAdminDashboard() {
  const classes = useStyles();
  const [user, setUser] = useState([])
  const baseUrl = config.API_URL
  const token = localStorage.getItem("token")
  const stateLogin = localStorage.getItem("state")

  useEffect(() => {
      getContent(`${baseUrl}/admins?state=${stateLogin}`, token)
      .then(data=>setUser(data.data))
  }, [token, stateLogin]);
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <PersonIcon />
              </CardIcon>
              <p className={classes.cardCategory}>State Admin</p>
              <h3 className={classes.cardTitle}>
                {kCount(user.length)}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                  <ViewListIcon />
                <Link to="/admin/state">
                  View All
                </Link>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
        <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <PersonIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Pupils</p>
              <h3 className={classes.cardTitle}>
                {kCount(user.length)}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}> 
                  <ViewListIcon />
                <Link to="/state-admin/pupils" >
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
                <AssessmentIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Report</p>
              <h3 className={classes.cardTitle} style={{color: "white"}}>6</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <ViewListIcon />
                <Link to="/admin/report">
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
                <PaymentIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Payments</p>
              <h3 className={classes.cardTitle} style={{color: "white"}}>6</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <ViewListIcon />
                <Link to="/admin/payments">
                  View All
                </Link>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <NotificationImportantIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Notifications</p>
              <h3 className={classes.cardTitle} style={{color: "white"}}>0</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
              <ViewListIcon />
                <Link to="/admin/notifications">
                  View All
                </Link>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="primary" stats icon>
              <CardIcon color="primary">
                <AnnouncementIcon />
              </CardIcon>
              <p className={classes.cardCategory}>News</p>
              
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                  <ViewListIcon />
                <Link to="/admin/news-blog">
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
