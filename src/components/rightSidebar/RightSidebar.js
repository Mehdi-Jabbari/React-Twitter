import React, { useState, useEffect } from 'react'
import useStyles from './styles'
import Typography from '@material-ui/core/Typography'
import { Grid, ButtonBase } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { getHashTags } from '../../api/api_tweet';
import { toast } from 'react-toastify';
import { useTweetState, useTweetDispatch, setHashTagList } from '../../context/TweetContext';


// const hashTags = [
// "پرچم-دار_جدید",
// "کرونا-ویروس",
// "سامسونگ",
// "الهی_بمیرم_برات",
// "رضا_بهرام",
// "مهدی_جباری",
// "پرچم-دار_جدید",

// ]

const RightSidebar = () => {


    const classes = useStyles();
    const { hashTags } = useTweetState();
    const tweetDispatch = useTweetDispatch();
    useEffect(() => {
        getHashTags((isOk, data) => {
            if (!isOk)
                return toast.error("ناموفق در دریافت هشتگ ها");
            setHashTagList(tweetDispatch, data);
            console.log(data);
        })
    }, []);



    return (
        <div className={classes.root}>
            <Link to={"/"}>
                <Grid container direction="row" alignItems={'center'}>
                    <Grid item>
                        <img src={"/images/twitter.svg"} width={50} />
                    </Grid>
                    <Grid item>
                        <Typography className={classes.logoType} >
                            توییتر فارسی
                        </Typography>
                    </Grid>
                </Grid>
            </Link>
            <Typography className={classes.hashTagTitle}>
                داغترین هشتگ ها
            </Typography>

            <Grid container alignItems={'center'} direction={"column"}>
                {
                    hashTags.map(item =>
                        <Link to={"/hashtags/" + item.text} style={{ width: "100%" }}>
                            <ButtonBase className={classes.button}>
                                <Grid item container>
                                    <img src={"/images/hashtag.png"} width={20} />
                                    <Typography className={classes.hashTag}>
                                        {item.text}
                                    </Typography>
                                </Grid>
                            </ButtonBase>
                        </Link>
                    )
                }


            </Grid>
        </div>
    );
}

export default RightSidebar;