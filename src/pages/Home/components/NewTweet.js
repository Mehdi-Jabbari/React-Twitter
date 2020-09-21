import React, { useRef, useState } from 'react';
import useStyles from '../styles';
import { Typography, Avatar, Grid, Button, IconButton } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import ImageIcon from '@material-ui/icons/Image';
import classnames from 'classnames';
import { newTweetRequest, getAllTweets, getTweetsByHashTagRequest } from '../../../api/api_tweet';
import { toast } from 'react-toastify';
import { useTweetState, useTweetDispatch, updateHashTagList, setTweetList } from '../../../context/TweetContext';
//import {useTweetState} from '../../../context/TweetContext';
import { settweetText as setTweet } from '../../../context/TweetContext';


const NewTWeet = ({ updateTweets }) => {


    const input = useRef();
    const inputFile = useRef();

    const [imageFile, setImageFile] = useState();
    const [imagePath, setImagePath] = useState();

    const { tweetText: tweet } = useTweetState();
    const tweetDispatch = useTweetDispatch();

    // React.useEffect(() => {
    // input.current.addEventListener("input", function () {
    //     console.log("input change");
    // }, false)
    //}, [])
    const updateTweet=()=>{
        getAllTweets((isOk,data)=>{
            if(!isOk)
            return alert("ناموفق بود")
            setTweetList(tweetDispatch,data)
        })
    }
    const newTweetClick = () => {
        const tweetText = tweet;
        if (!tweetText)
            return;
        const formData = new FormData();
        formData.append("text", tweetText);
        if (imageFile)
            formData.append("image", imageFile);
        newTweetRequest(formData, (isOk, data) => {
            if (!isOk)
                return toast.error(data);
            toast.success("توییت شما ارسال شد");

            updateTweet();
           // getAllTweets();
            setTweet(tweetDispatch, "");
            setImagePath();
            setImageFile();
            if(tweetText.includes("#"))
            updateHashTagList(tweetDispatch);
            
        })
    };

    const getimage = () => {

        if (localStorage.getItem("image") && localStorage.getItem("image") !== 'undefined')
            return localStorage.getItem("image");
        return "/images/ali.png";
    }

    const onChangeImg = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setImageFile(e.target.files[0]);

            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePath(e.target.result);
            };
            reader.readAsDataURL(e.target.files[0]);
        };
    };


    const selectImage = () => {
        inputFile.current.click()

    };


    const classes = useStyles()
    return (
        <div className={classes.NewTweet}>
            <Grid container>
                <Avatar alt="Mehdi" src={getimage()} style={{ marginRight: 10 }} />
                <input placeholder={"توییت کن"}
                    className={classnames(classes.input)}
                    value={tweet} onChange={e => setTweet(tweetDispatch, e.target.value)}
                >

                </input>
                <input type={"file"} style={{ display: 'none' }} ref={inputFile} onChange={onChangeImg} />
            </Grid>
            {
                imagePath &&
                <div>
                    <div style={{ backgroundImage: `url(${imagePath})`, }} className={classes.tweetImg}></div>
                </div>
            }
            <Grid container direction={'row-reverse'} style={{ marginTop: 16 }}  >
                <Button variant={'contained'} color={'primary'} className={classes.tweetbtn} onClick={newTweetClick}>
                    توییت
                </Button>
                {/* <img src={"images/photo.png"} className={classes.tweeetPic} /> */}

                <IconButton size="small" className={classes.tweeetPic} onClick={selectImage}>
                    <ImageIcon color={'secondary'} fontSize="small" />
                </IconButton>


            </Grid>

        </div>
    );
}

export default NewTWeet;