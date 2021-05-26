import React from "react";
// nodejs library that concatenates classes
// import classNames from "classnames";
// react components for routing our app without refresh
// import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";
// import HomePageBlog from 'views/Blog/HomePageBlog';
// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.js";
// import Dialog from '../components/dialogBox';
import styles from "assets/jss/material-kit-react/views/landingPagestyle.js";

const useStyles = makeStyles(styles);

export default function LandingPage() { 
  const classes = useStyles();
  
  return (
    <div>
      <Header
        brand="NHGSFRT"
        rightLinks={<HeaderLinks />}
        fixed
        color="transparent"
        style={{
          position: "relative"
        }}
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        // {...rest}  
      />
      <div>
        {/* <Dialog isTrue={true} /> */}
        <Parallax image={require("assets/img/bg22.jpg")}>
          <div className={classes.container}>
            {/* <div className={classes.backgroundImage}></div> */}
            <GridContainer>
              <GridItem>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
          <div className={classes.brand}>
            <h1 className={classes.title}>NHGSFRT</h1>
            <h3 className={classes.subtitle}>
              A program by the federal government to feed school pupils a meal per day
            </h3>
          </div>
      </div>
      {/* <div className={classNames(classes.main, classes.mainRaised)}>
          <div style={{padding: "4rem", backgroundColor: "#dee0e3", borderRadius: "8px"}}>
            <h3>News Blog</h3>
            <HomePageBlog />
          </div>
          
      </div> */}
      <Footer />
    </div>
  );
}
