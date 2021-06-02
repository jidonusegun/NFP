import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageCard from 'components/ImageCard/ImageCard';
import {Link} from 'react-router-dom';
import {dataContext} from 'components/context/DataContext';


const useStyles = makeStyles((theme) => ({
    cardContainer: {
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
}))

export default function StateReport() {
    const classes = useStyles();
    const { state } = useContext(dataContext);
        
    return (
        <div className={classes.cardContainer}>
            {state.map(({state, image, id}) => {
                return (
                    <Link to={{pathname:`/admin/payments/statePayment`, state: {state}}} key={id} className={classes.cardContent} style={{marginBottom: "2rem", color: "black", fontWeight: "bolder"}}>
                        {/* <div> */}
                            <ImageCard cardTitle={state} cardImage={image} />
                        {/* </div> */}
                    </Link>
                )
            })}
        </div>
    )
}
