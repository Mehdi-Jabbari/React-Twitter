import React, { useEffect, useState } from 'react'
import Haeder from '../Home/components/Header'
import PersonIcon from '@material-ui/icons/Person';
import { Divider, Typography } from '@material-ui/core';
import { getTweetsByUserRequest } from '../../api/api_tweet';
import { toast } from 'react-toastify';
import TweetList from '../Home/components/TweetList';
import { useLocation } from 'react-router-dom';


const TweetsUser = (props) => {


    const [tweets, setTweets] = useState([]);
    const Location = useLocation();


    useEffect(() => {
        getTweetsByUserRequest(props.match.params.id, (isOk, data) => {
            if (!isOk)
                return toast.error(data.message);
            else setTweets(data);
        })
    }, [Location])

    return (
        <div>
            <Haeder title={props.match.params.name} icon={<PersonIcon />} />
            <Divider />
            {
                tweets.length === 0 &&
                <Typography align={"center"} style={{color:"white"}}>این کاربر تابحال هیچ توییتی نداشته است !</Typography>
            }
            <TweetList data={tweets} />

        </div>
    )
}

export default TweetsUser
