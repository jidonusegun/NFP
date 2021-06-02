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
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import { makeStyles } from "@material-ui/core/styles";
import config from 'utils/config';
import userForm from "../../hooks/useForm";

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
 
export default function GeneralAdminPayments(props) {
    const classes = useStyles();
    const [loading, setLoading] = useState(false)
    const sendReport = userForm(sendToServer);
    const [cooks, setCooks] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [aggregators, setAggregators] = useState([])
    // const { token } = useContext(dataContext);
    const token = localStorage.getItem("token")
    const baseUrl = config.API_URL

    const name = props.location.state.state;
  const stateName = name.toLowerCase()

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
        <Card>
          <CardHeader color="primary" className={classes.cardHeader}>
            <div>
              <h4 className={classes.cardTitleWhite}>{name} State Payment Report</h4>
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
            </Card>
      </GridItem> 
    </GridContainer>
        </div>
    )
}
