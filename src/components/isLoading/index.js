import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';


const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 1,
        borderRadius: 5,
    },
    colorPrimary: {
        backgroundColor:
            theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
        borderRadius: 5,
        backgroundColor: '#1a90ff',
    },
}))(LinearProgress);

// Inspired by the former Facebook spinners.
const useStylesFacebook = makeStyles((theme) => ({
    root: {
        position: 'relative',
    },
    bottom: {
        color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    ml7: {
        marginLeft: 7,
    },
    circle: {
        strokeLinecap: 'round',
    },
}));

function FacebookCircularProgress(props) {
    const classes = useStylesFacebook(); 

    return (
        <CircularProgress
            variant="indeterminate"
            disableShrink
            className={classes.ml7}
            color="secondary"
            classes={{
                circle: classes.circle,
            }}
            size={13}
            thickness={6}
            {...props}
        />
    );
}

export default function CustomizedProgressBars({style}) {
    return <FacebookCircularProgress style={style}  />;
}
