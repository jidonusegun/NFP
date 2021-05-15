import React, { useState, useEffect } from "react";
// components
import {getContent} from 'utils';
import NewAggregator from 'views/Report/stateNewlyAddedAggregators';
import SchoolIcon from '@material-ui/icons/School';
import RestaurantIcon from '@material-ui/icons/Restaurant';
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import NewSchool from 'views/Report/stateNewlyAddedSchools';
import NewCook from 'views/Report/stateNewlyAddedCooks'; 
// import { dataContext } from "components/context/DataContext";
// core components

export default function TableList() {

  const [cook, setCook] = useState([])
  const [school, setSchool] = useState([])
  const [loading, setLoading] = useState(false) 
  const [aggregator, setAggregator] = useState([]) 
  const token = localStorage.getItem("token")
  const baseUrl = localStorage.getItem("baseUrl")

  useEffect(() => {
    setLoading(true);
    getContent(`${baseUrl}/cooks?state=lagos&lga=badagry&status=PENDING`, token)
    .then(data=>setCook(data.data))

    getContent(`${baseUrl}/aggregators?state=lagos&lga=badagry&status=PENDING`, token)
    .then(data=>setAggregator(data.data))

    getContent(`${baseUrl}/schools?state=lagos&lga=badagry&status=PENDING`, token)
    .then(data=>setSchool(data.data))
    setLoading(false);
  }, [token]);
//   console.log(cook)
  console.log(aggregator)
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
      
    </div>
  );
}
