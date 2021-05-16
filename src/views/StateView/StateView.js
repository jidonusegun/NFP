import React, { useContext, useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
// import CardBody from "components/Card/CardBody.js";
import AddButton from 'components/AddButton/AddButton';
import Popover from 'components/Popover/Popover.js';
import DialogContainer from 'components/Dialog/DialogContainer.js';
import AdminUser from 'views/UserProfile/AdminUser';
import { dataContext } from 'components/context/DataContext';
import PersonIcon from '@material-ui/icons/Person';
import SpeedDial from 'components/SpeedDial/SpeedDial.js';
import ImageCard from 'components/ImageCard/ImageCard';
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import TableSchools from 'views/TableList/SuperTableSchool';
import TableCook from 'views/TableList/SuperTableCook';
import TableAggregator from 'views/TableList/SuperTableAggregator';
import SchoolIcon from '@material-ui/icons/School';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import userForm from "../../hooks/useForm";
import {getContent} from 'utils';
import config from 'utils/config';
// icon components

const useStyles = makeStyles((theme) => ({
    cardContainer: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    cardContent: {
        flex: "0 0 100%",
        textAlign: "center",
        cursor: "pointer",
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
  link: {
    marginBottom: "2rem", 
    marginTop: "1.5rem", 
    fontWeight: "700",
    color: theme.primary,
  }
  
}));

export default function StateView(props) {
  const classes = useStyles();
  const addLga = userForm(sendToServer);
  const { handleClickPop, handleClickOpen } = useContext(dataContext);
  const stateName = props.location.state.state;
  const [loading, setLoading] = useState(false)
  const [account, setAccount] = useState([])
  // const [lgaValue, setLgavalue] = useState([])
  // const [, setStatevalue] = useState([])
  // const [status, setStatus] = useState()
  var token = localStorage.getItem("token");
  const baseUrl = config.API_URL

  async function sendToServer() {
  // const response = await postContent("${baseUrl}/cook", addLga.values, token);
  }

  useEffect(() => {
    setLoading(true);
      getContent(`${baseUrl}/admins?state=${stateName}`, token)
      .then(data=>setAccount(data.data))

      // getContent("${baseUrl}/settings/states", token)
      // .then(data=>setStatevalue(data.data))
    setLoading(false);
  }, [token, stateName]);

  const [userDetails, setUserDetails] = useState();

  return (  
    <div>
      <DialogContainer children= {<AdminUser title="Add Data" sendButton="Submit" />} />
      <Popover children={<SpeedDial details={userDetails} />} />

      <div style={{display: "flex", justifyContent: "flex-end", padding: "0 2rem 2rem 2rem"}}>
        <FormControl className={classes.formControl} style={{width: "200px"}}>
          <InputLabel htmlFor="filter" style={{color: "#D2D2D2", fontWeight: "normal"}}>Filter</InputLabel>
          <Select
            native
            // style={{padding: "0px 10px !important"}}
            value={addLga.values.lga}
            onChange={addLga.getData}
            className={classes.underline}
            style={{width: "100%", padding: "0px 10px"}}
            inputProps={{
              name: 'filter',
              id: 'filter',
            }}
          >
            <option aria-label="None" value="" />
            {/* {lgaValue.map(lga => {
              return <option value={lga}>{lga}</option>
            })} */}
          </Select>
        </FormControl>
      </div>
      <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        {loading ? <div>Loading... Please wait</div> : 
          <div>
              <Card>
                <CardHeader color="primary" className={classes.cardHeader}>
                  <div>
                    <h4 className={classes.cardTitleWhite}>{stateName} State Admin(s)</h4>
                    <p className={classes.cardCategoryWhite}>
                    </p>
                  </div> 
                </CardHeader> 
                {/* <CardBody className={classes.cardContainer}> */}
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomTabs
                        headerColor="danger"
                        tabs={[
                          {
                            tabName: "State Admin(s)",
                            tabIcon: PersonIcon,
                            tabContent: (
                              <div>
                                {account.length > 0 ? 
                                  <div className={classes.cardContainer}>
                                    {account.map(({_id, username, gender, birthday, role, firstName, lastName, phoneNumber, email, state, lga, address, logo, status }) => {
                                    // const username = {firstName, lastName}
                                    // setStatus(success)
                                      return (
                                          <div className={classes.cardContent} key={_id}>
                                            <div   onClick={handleClickPop} onMouseUp={function(event){ setUserDetails({_id, username, gender, birthday, role, firstName, lastName, phoneNumber, email, state, lga, address, logo, status});}}>
                                              <ImageCard cardTitle={firstName} cardImage={firstName} /> 
                                            </div>
                                          </div> 
                                        )
                                    })}
                                  </div>
                                  : 
                                  <div>No Data yet</div>}
                                
                              </div>
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
                          }
                        ]}
                      />
                    </GridItem>
                  </GridContainer>
                        {/* </CardBody> */}
                      </Card>
                  </div>
                }
        </GridItem>      
      </GridContainer>

        <AddButton handleClickOpen={handleClickOpen} />
    </div>
  );
}
