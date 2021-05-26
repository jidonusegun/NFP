import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import SchoolIcon from '@material-ui/icons/School';
import RestaurantIcon from '@material-ui/icons/Restaurant';
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import TableSchools from 'views/TableList/SuperTableSchool';
import TableCook from 'views/TableList/SuperTableCook';
import TablePupil from 'views/TableList/SuperTablePupils';
import TableAggregator from 'views/TableList/SuperTableAggregator';
import StateAdmin from 'views/StateView/StateView'
import styles from "assets/jss/material-kit-react/views/componentsSections/tabsStyle.js";

const useStyles = makeStyles(styles);

export default function Tabs() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <div id="nav-tabs">
            <div style={{display: "flex", justifyContent: "flex-end", padding: "0 2rem 2rem 2rem"}}>
                <input type="text" name="search" placeholder="Search..." style={{borderRadius: "5px", padding: "10px", border: "1px solid gray", backgroundColor: "transparent", width: "200px"}} />
            </div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <CustomTabs
                headerColor="danger"
                tabs={[
                  {
                    tabName: "State Admins",
                    tabIcon: SchoolIcon,
                    tabContent: (
                      <StateAdmin />
                    )
                  },
                  {
                    tabName: "Pupils",
                    tabIcon: RestaurantIcon,
                    tabContent: (
                      <TablePupil />
                    )
                  },
                  {
                    tabName: "Schools",
                    tabIcon: SchoolIcon,
                    tabContent: (
                      <TableSchools />
                    )
                  },
                  {
                    tabName: "Cooks",
                    tabIcon: RestaurantIcon,
                    tabContent: (
                      <TableCook />
                    )
                  },
                  {
                    tabName: "Aggregators",
                    tabIcon: RestaurantIcon,
                    tabContent: (
                      <TableAggregator />
                    )
                  },
                ]}
              />
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
