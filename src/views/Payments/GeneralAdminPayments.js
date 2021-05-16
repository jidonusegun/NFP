import React, { useState, useEffect} from 'react';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import RestaurantIcon from '@material-ui/icons/Restaurant';
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import CooksPaymentsReport from "views/Report/CooksPaymentsReport.js";
import AggregatorsPaymentsReport from "views/Report/AggregatorsPaymentsReport.js";
import SummaryReport from "views/Report/SummaryReport.js";
// import { dataContext } from 'components/context/DataContext';
import {getContent} from 'utils';
import config from 'utils/config';
 
export default function GeneralAdminPayments() {
    const [loading, setLoading] = useState(false)
    const [cooks, setCooks] = useState([])
    const [aggregators, setAggregators] = useState([])
    // const { token } = useContext(dataContext);
    const token = localStorage.getItem("token")
    const baseUrl = config.API_URL

    useEffect(() => { 
        setLoading(true);
        getContent(`${baseUrl}/`, token)
        .then(data=>setCooks(data.data))

      getContent(`${baseUrl}/`, token)
      .then(data=>setAggregators(data.data))
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
                        tabName: "Cooks",
                        tabIcon: RestaurantIcon,
                        tabContent: (
                            <div>
                                {loading ? <div>Loading... Please wait</div> : 
                                <CooksPaymentsReport cookPaymentDetails={cooks} />}
                            </div>
                        )
                        },
                        {
                        tabName: "Aggregators",
                        tabIcon: RestaurantIcon,
                        tabContent: (
                            <div>
                                {loading ? <div>Loading... Please wait</div> : 
                                <AggregatorsPaymentsReport aggregatorPaymentDetails={aggregators} />}
                            </div>
                        )
                        },
                        {
                        tabName: "Summary",
                        tabIcon: GroupWorkIcon,
                        tabContent: (
                            <div>
                                {loading ? <div>Loading... Please wait</div> : 
                                <SummaryReport />}
                            </div>
                        )
                        },
                    ]}
                    />
                </GridItem>
            </GridContainer>
        </div>
    )
}
