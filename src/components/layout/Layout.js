import React, { useEffect, useState } from 'react'
import useStyles from './styles'
import RightSidebar from '../rightSidebar/RightSidebar';
import { Divider, CircularProgress, Typography } from '@material-ui/core';
import LeftSidebar from '../leftSidebar/LeftSidebar';
import Home from '../../pages/Home/Home';
import TweetByHashTag from '../../pages/tweetByHashtag/TweetByHashTag';
import TweetsUser from '../../pages/tweetsUser/TweetsUser';
import { BrowserRouter, Route, useHistory } from 'react-router-dom'
import Page from '../../pages/page';
import { toast } from 'react-toastify';
import { getProfileRequest } from '../../api/api_auth';


const Layout = (props) => {

    const classes = useStyles();
    const history = useHistory();
    const [wait, setWait] = useState(true);


    useEffect(() => {
        getProfileRequest((isOk, data) => {
            if (!isOk) {
                toast.error(data);
                localStorage.clear();
                return history.push("/login")
            }
            setWait(false);
            localStorage.setItem("name", data.name);
            localStorage.setItem("image", data.image);
            localStorage.setItem("username", data.username);
            localStorage.setItem("x-auth-token", data["x-auth-token"]);
        });

    }, [])


    if (wait)
        return <div className={classes.waitParent}>
            <CircularProgress />
            <br />
            <Typography>لطفا چند لحظه صبر کنید</Typography>
        </div>;
    else
        return (
            <div className={classes.root}>
                <RightSidebar />
                <Divider orientation="vertical" className={classes.divider} />
                <div className={classes.mainPart}>
                    {props.children}
                </div>
                <Divider orientation="vertical" className={classes.divider} />
                <LeftSidebar />
            </div>
        );
}

export default Layout;
