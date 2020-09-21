import React, { useEffect } from 'react';
import { Grid, Avatar, Button, IconButton, Typography } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite'; import useStyles from '../styles';
import CachedIcon from '@material-ui/icons/Cached';
import { useTweetDispatch, settweetText, liketweet } from '../../../context/TweetContext';
import { likeTweetRequest } from '../../../api/api_tweet';
import { toast } from 'react-toastify';



const Tweet = ({ data }) => {

    const classes = useStyles()
    const tweetDispatch = useTweetDispatch();


    const getImage = () => {
        if (data.user.image)
            return data.user.image;
        else return "/images/ali.png";
    }


    const retweetClick = () => {
        settweetText(tweetDispatch, data.text)
    }
    const handelLike = () => {
        likeTweetRequest(data._id, (isOk, data) => {
            if (!isOk)
                return toast.error(data)
            liketweet(tweetDispatch, data._id)
        })
    }
   
    return (
        <div className={classes.tweetItem}>
            <Grid container>

                <Avatar alt="Mehdi" src={getImage()} style={{ marginRight: 10, }} />
                <Grid item container direction={"column"} style={{ flex: 1, marginRight: '1rem' }}>
                    <Grid item container style={{ flex: 1 }} >
                        <Typography className={classes.name}>{data.user.name}</Typography>
                        <Typography className={classes.id} variant="caption">{data.user.id}</Typography>
                    </Grid>
                    <Typography style={{ marginTop: '1rem' }}>
                        {data.text}
                    </Typography>
                    {
                        data.image !=="undefined" && data.image &&
                        <div>
                            <div style={{ backgroundImage: `url(${data.image})` }} className={classes.tweetImg} />
                        </div>
                    }
                </Grid>

            </Grid>
            <Grid container direction={'row-reverse'} style={{ marginTop: 16 }} alignItems={"center"}  >
                <IconButton size="small" className={classes.tweeetPic} onClick={retweetClick}>
                    <CachedIcon color={"primary"} fontSize="small" />
                </IconButton>
                {/* <img src={"images/photo.png"} className={classes.tweeetPic} /> */}

                <IconButton size="small" className={classes.tweeetPic} onClick={handelLike}>
                    <FavoriteIcon color={"secondary"} fontSize="small" />
                </IconButton>
                <Typography variant="caption" style={{ marginLeft: '0.75rem' }}>
                    {data.likes}
                </Typography>


            </Grid>

        </div>
    );
}



export default Tweet;