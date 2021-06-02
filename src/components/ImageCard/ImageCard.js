import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import config from 'utils/config';
import styles from "assets/jss/material-kit-react/views/componentsSections/typographyStyle.js";

const useStyles = makeStyles(styles);

export default function ImageCard({cardTitle, cardImage}) {
    const classes = useStyles();
    const baseUrl = config.API_URL
    const image = baseUrl+'/'+cardImage
    console.log(image)
    return (
        <div style={{textAlign: "center"}}>
              <img
                src={cardImage} 
                alt={cardTitle}
                className={
                  classes.imgRaised +
                  " " +
                  classes.imgRoundedCircle +
                  " " +
                  classes.imgFluid
                }
              />
              <h4 style={{marginTop: "0", marginBottom: "0"}}>{cardTitle}</h4>
        </div>
    )
}
