import React from 'react';
import useStyles from '../styles';
import { Typography } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';



const Haeder = (props) => {
    const classes = useStyles()
    return (
        <div className={classes.header}>
            <div style={{display:"flex",flexDirection:"row"}}>
                {props.icon}
                <Typography className={classes.headerTitle}>
                    {props.title}
                </Typography>
            </div>
        </div>
    );
}

export default Haeder;