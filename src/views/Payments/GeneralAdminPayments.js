import React, { useState, useEffect} from 'react';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import RestaurantIcon from '@material-ui/icons/Restaurant';
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import CooksPaymentsReport from "views/Report/generalCooksPaymentsReport.js";
import AggregatorsPaymentsReport from "views/Report/generalAggregatorsPaymentsReport.js";
import SummaryReport from "views/Report/summaryGeneralAdminReport.js";
// import { dataContext } from 'components/context/DataContext';
import {getContent, postContent} from 'utils';
import config from 'utils/config';
import userForm from "../../hooks/useForm";
 
export default function GeneralAdminPayments() {
    const [loading, setLoading] = useState(false)
    const sendReport = userForm(sendToServer);
    const [cooks, setCooks] = useState([])
    const [isLoading, setIsLoading] = useState(false)
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

    async function sendToServer() {
        try {
          setIsLoading(true)
          const response = await postContent(`${baseUrl}/payment-report/downloadReport/lagos/badagry/2021-04/COOK`, token);
          alert("Your report has been sent")
          setIsLoading(false)
        } catch ({message}) {
          alert(message)
        }
      }

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
