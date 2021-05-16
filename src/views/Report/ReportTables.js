import React, {useState, useEffect} from 'react';
import SchoolIcon from '@material-ui/icons/School';
import RestaurantIcon from '@material-ui/icons/Restaurant';
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import NewlyRegisteredCooks from "views/Report/NewlyRegisteredCooks.js";
import NewlyRegisteredSchools from "views/Report/NewlyRegisteredSchools.js";
import NewlyRegisteredAggregators from "views/Report/NewlyRegisteredAggregators.js";
import config from 'utils/config';
// import { dataContext } from "components/context/DataContext";
import {getContent} from 'utils';

 
export default function ReportTables() {

  const [cook, setCook] = useState([])
  const [school, setSchool] = useState([])
  const [loading, setLoading] = useState(false) 
  const [aggregator, setAggregator] = useState([]) 
  const token = localStorage.getItem("token")
  const baseUrl = config.API_URL

  useEffect(() => {
    setLoading(true);
    getContent(`${baseUrl}/cooks?state=lagos&lga=badagry&status=AWAITING_APPROVAL`, token)
    .then(data=>setCook(data.data))

    getContent(`${baseUrl}/aggregators?state=lagos&lga=badagry&status=AWAITING_APPROVAL`, token)
    .then(data=>setAggregator(data.data))

    getContent(`${baseUrl}/schools?state=lagos&lga=badagry&status=AWAITING_APPROVAL`, token)
    .then(data=>setSchool(data.data))
    setLoading(false);
  }, [token]);

    return (
      <div>
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
                      {loading ? <div>Loading... Please wait</div> : <NewlyRegisteredSchools schoolsList={school} />}
                    </div>
                  )
                },
                {
                  tabName: "Cooks",
                  tabIcon: RestaurantIcon,
                  tabContent: (
                    <div>
                      {loading ? <div>Loading... Please wait</div> : <NewlyRegisteredCooks cooksList={cook} />}
                    </div>
                  )
                },
                {
                  tabName: "Aggregators",
                  tabIcon: RestaurantIcon,
                  tabContent: (
                    <div>
                      {loading ? <div>Loading... Please wait</div> : <NewlyRegisteredAggregators aggregatorsList={aggregator} />}
                    </div>
                  )
                }
              ]}
            />
          </GridItem>
        </GridContainer>
      </div>
    )
}
