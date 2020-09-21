
import React, { useEffect, useState } from 'react';
import { Divider } from '@material-ui/core';

import Haeder from '../Home/components/Header';
import useStyles from '../Home/styles'
import { getAllTweets, getTweetsByHashTagRequest } from '../../api/api_tweet';
import TweetList from '../Home/components/TweetList';
import { toast } from 'react-toastify';
import { useTweetState, useTweetDispatch, setTweetList } from '../../context/TweetContext';
import { useLocation } from 'react-router-dom';

const TweetByHashTag = (props) => {
    const classes = useStyles();
    const { tweetList } = useTweetState();
    const tweetDispatch=useTweetDispatch();
    const Location=useLocation();
    //const [tweets, setTweets] = useState([]);


    useEffect(() => {
        getTweetsByHashTagRequest(props.match.params.hashtag, (isOk, data) => {
            if (!isOk)
                return toast.error(data)
            setTweetList(tweetDispatch,data)
        });

    }, [Location]);

    return (
        <div className={classes.header}>
            <Haeder title={props.match.params.hashtag} icon={<img src={"/images/hashtag.png"} width={20} />} />
            <Divider className={classes.divider} />
            <TweetList data={tweetList} />

        </div>
    );
}

export default TweetByHashTag;