import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";

import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";

// import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import bgImage from "assets/img/sidebar-2.jpg";
// import logos from "assets/img/logos.png";

const logos = '/media/img/logos.png'

let ps;

const tokensession  = sessionStorage.getItem('token')
const tokenLocal  = localStorage.getItem('token')
const user = localStorage.getItem('username')
const stateLogin = localStorage.getItem("state")
// console.log(user)
const token = props => {
  return props
}

console.log('=====================')
console.log(tokensession)

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/state-admin") {
        
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component} 
            key={key}
          />
          
        );
      }
      return null;
    })}
  {tokenLocal ? <Redirect from="/state-admin" to="/state-admin/home" /> : <Redirect from="/state-admin/home" to="/login-page" />}
    
  </Switch>
);
// const {state} = props
// console.log(tokenLocal)
const useStyles = makeStyles(styles);

export default function Admin({ ...rest }) {
  // styles
  // return (<label>{tokensession}</label>);
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [image] = React.useState(bgImage);
  const [color] = React.useState("blue");
  const [mobileOpen, setMobileOpen] = React.useState(false);
 
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return window.location.pathname !== "/admin/maps";
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);
  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
        logoText={`${stateLogin} Admin`}
        logo={logos}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
        {/* tokenLocal ? switchRoutes : <Redirect from="/state-admin/home" to="/login-page" /> */}
        {getRoute() ? (
          <div className={classes.content}>
            <div className={classes.container}>{ switchRoutes }</div>
          </div>
        ) : (
          <div className={classes.map}>{switchRoutes}</div>
        )}
        {getRoute() ? <Footer /> : null}
        
        {/* <Dashboard /> */}
      </div>
    </div>
  );
}
