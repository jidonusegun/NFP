import React, {useState, useEffect} from 'react';
import 'views/Payments/payments.css';
import CooksPaymentsList from 'views/PaymentsList/CooksPaymentsList';
import AggregatorsPaymentsList from 'views/PaymentsList/AggregatorsPaymentsList';
import CooksPaymentDetails from 'views/Report/CooksPaymentsReport';
import AggregatorsPaymentDetails from 'views/Report/AggregatorsPaymentsReport';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import Summary from 'views/Report/SummaryReport';
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import { makeStyles } from '@material-ui/core/styles';
import {postContent, getContent} from 'utils';
import userForm from "../../hooks/useForm"; 
import config from 'utils/config';

const useStyles = makeStyles((theme) => ({
    dNone: { 
        display: "none",
    },
    dBlock: {
        display: "block",
    },
    form: {
        marginBottom: "3rem",
    }
}))

const userData = [];

export default function Payments() {
    const addPayment = userForm(sendToServer);
    const classes = useStyles();
    const [cssActive, setCssActive] = useState({active: false})
    const [cookPayment, setCookPayment]= useState([])
    const [aggregatorPayment, setAggregatorPayment]= useState([])
    const [summary, setSummary]= useState([])
    const [stateValue, setStatevalue] = useState([])
    const [lgaValue, setLgavalue] = useState([])
    const [loading, setLoading] = useState(false)
    const [stateID, setStateID] = useState()
    const [categoryValue, setCategoryValue] = useState({value: "Select Category"})
    const token = localStorage.getItem("token")
    const [errorMessage, setErrorMessage] = useState([])
    const [paymentInput, setPaymentInput] = useState({pulpilFeed: "", Days: ""})
    const baseUrl = config.API_URL

    const handlePaymentChange = (e) => {
        setPaymentInput({[e.target.name]: e.target.value});
      }

    async function sendToServer() {
        
        addPayment.setData('userData',userData)

        // let newPulpilFeed = addPayment.values.userData.map(({pulpilFeed},index) => index.pulpilFeed)
        // let newDays = addPayment.values.userData.map(({Days},index) => Days)


        // if(!addPayment.values.startDate) {
        //     setErrorMessage("Start date is required")
        // }
        // else if(!addPayment.values.endDate) {
        //     setErrorMessage("End date is required")
        // }
        // else if(!addPayment.values.month) {
        //     setErrorMessage("Month is required")
        // }
        // else if(!addPayment.values.state) {
        //     setErrorMessage("State is required")
        // }
        // else if(!addPayment.values.lga) {
        //     setErrorMessage("Lga is required")
        // }
        // else if(!addPayment.values.amountPerMeal) {
        //     setErrorMessage("Amount per meal is required")
        // }
        // else if(!addPayment.values.userType) {
        //     setErrorMessage("Category is required")
        // }
        if(paymentInput.pulpilFeed === "") {
            setErrorMessage("Number of pupils is required")
        }
        else if(paymentInput.Days === "") {
            setErrorMessage("Number of days fed is required")
        }
        else {
            // try {
            //     const response = await postContent("https://nsfp.herokuapp.com/v1/payment-report", addPayment.values, token);
            //     console.log(response);
            // }
            // catch(err) {
            //     // setErrorMessage(err)
            // }

            console.log("Valid Input Field")
        }
       
      }

    //   console.log(paymentInput)

      const handleChangeState = (e) => {

        var index = e.target.selectedIndex;
        var optionElement = e.target.childNodes[index]
        var option =  optionElement.getAttribute('id');
    
        setStateID(option)
      }

      useEffect(() => {
        setLoading(true)
        getContent(`${baseUrl}/payment-report?state=lagos&lga=badagry&month=january`, token)
        .then(data=>setCookPayment(data.data))

        getContent(`${baseUrl}/payment-report?state=lagos&lga=badagry&month=january`, token)
        .then(data=>setAggregatorPayment(data.data))

        getContent(`${baseUrl}/`, token)
        .then(data=>setSummary(data.data))
        setLoading(false)

        getContent(`${baseUrl}/settings/states`, token)
        .then(data=>setStatevalue(data.data))
    
        getContent(`${baseUrl}/settings/state/${stateID}/lgas`, token)
        .then(data=>setLgavalue(data.data))

      },[token, stateID])


    const handleClick = () => {
        setCssActive({active: true})
    }

    const handleChange = (e) => {
        setCategoryValue({value: e.target.value})
        handleClick()
    }

    return (
        <div className="payments">
            <form className={classes.form}>
                <div className="form-container">
                    <div className="personal-information">
                        <h1>Payment Information</h1>
                    </div> {/* <!-- end of personal-information --> */}
                    <div style={{color: "red", textAlign: "center", width: "100%", magrin: ".5rem 0"}}>{`${errorMessage}`}</div>
                    <div style={{width: "100%", clear: "both"}}>
                        <div id="column-left">
                            <label>Payment Date From:</label>
                            <input type="date" id="startDate" name="startDate" placeholder="From" onChange={addPayment.getData}/>
                        </div>
                        <div id="column-right">
                            <label>Payment Date To:</label>
                            <input type="date" id="endDate" name="endDate" placeholder="To" onChange={addPayment.getData}/>
                        </div>
                    </div>
                    <div style={{width: "100%", clear: "both"}}>
                        <div id="column-left">
                            <label>Month:</label>
                            <input type="month" id="month" name="month" placeholder="Month" onChange={addPayment.getData}/>
                        </div>
                        <div id="column-right">
                        <label>State:</label>
                            <select onChange={(e) =>{handleChangeState(e)
                            addPayment.getData(e)}} name="state" id="state" value={addPayment.values.state}>
                                <option aria-label="None" value="">Select State</option>
                                {stateValue.map(({name, _id}) => {
                                    return <option value={name} id={_id}>{name}</option>
                                })}
                            </select>
                        </div>
                    </div>
                    
                    <div style={{width: "100%", clear: "both"}}>
                        <div id="column-left">
                            <select onChange={(e) => {handleClick() 
                                addPayment.getData(e)}} name="lga" id="lga" value={addPayment.values.lga}>
                                <option aria-label="None" value="">Select Local Government</option>
                                {lgaValue.map(lga => {
                                    return <option value={lga}>{lga}</option>
                                })}
                            </select>
                        </div>
                        <div id="column-right">
                            <input type="number" id="amountPerMeal" name="amountPerMeal" placeholder="Amount per Meal" onChange={addPayment.getData}/>
                        </div>
                    </div>
                    <div style={{width: "100%", clear: "both"}}>
                        <div id="column-left">
                            <select onChange={(e) =>{handleChange(e)
                            addPayment.getData(e)}} defaultValue={categoryValue} id="userType" name="userType" value={addPayment.values.userType}>
                                <option value="">Select Category</option>
                                <option value="COOK">COOK</option>
                                <option vlaue="AGGREGATOR">AGGREGATOR</option>
                            </select>
                        </div>
                        <div id="column-right">
                            {/* <select onChange={(e) =>{handleChange(e)
                        addPayment.getData(e)}} defaultValue={categoryValue} id="userType" name="userType" value={addPayment.values.userType}>
                                <option value="">Select Category</option>
                                <option value="COOK">COOK</option>
                                <option vlaue="AGGREGATOR">AGGREGATOR</option>
                            </select> */}
                        </div>
                    </div>
                    

                    <div className={cssActive.active && categoryValue.value === "COOK" ? classes.dBlock : classes.dNone} style={{marginTop: "4rem"}}>
                        {loading ? <div>Loading... Please wait</div> : <CooksPaymentsList state={addPayment.values.state} lga={addPayment.values.lga} userData={userData} handlePaymentChange={handlePaymentChange} />}
                    </div>
                    
                    <div className={cssActive.active && categoryValue.value === "AGGREGATOR" ? classes.dBlock : classes.dNone} style={{marginTop: "4rem"}}>
                        {loading ? <div>Loading... Please wait</div> : <AggregatorsPaymentsList state={addPayment.values.state} lga={addPayment.values.lga} userData={userData} />}
                    </div>
                    <button id="input-button" onClick={addPayment.submit} className="submitButton">Submit</button>
                </div>
            </form>

            <CustomTabs
              headerColor="danger"
              tabs={[
                {
                  tabName: "Cooks Payment Details",
                  tabIcon: RestaurantIcon,
                  tabContent: (
                    <div>
                      {loading ? <div>Loading... Please wait</div> : <CooksPaymentDetails cookPaymentDetails={cookPayment} />}
                    </div>
                  )
                },
                {
                  tabName: "Aggregators Payment Details",
                  tabIcon: RestaurantIcon,
                  tabContent: (
                    <div>
                      {loading ? <div>Loading... Please wait</div> : <AggregatorsPaymentDetails aggregatorPaymentDetails={aggregatorPayment} />}
                    </div>
                  )
                },
                {
                  tabName: "Summary",
                  tabIcon: GroupWorkIcon,
                  tabContent: (
                    <div>
                      {loading ? <div>Loading... Please wait</div> : <Summary summaryTable={summary} />}
                    </div>
                  )
                }
              ]}
            />         
        </div>
    )
}
