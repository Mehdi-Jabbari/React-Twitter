import React, { useEffect, useState, useRef } from 'react';
import useStyles from './styles';
import { Avatar, Grid, Typography, Divider, ButtonBase, Menu, MenuItem } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { uploadUserPhoto } from '../../api/api_auth';
import { toast } from 'react-toastify';
import { getUsers } from '../../api/api_tweet';

const Tweeter = (props) => {
    // const getimage = () => {
    //     if (img)
    //         return img;
    //     if (localStorage.getItem("image") && localStorage.getItem("image") !== 'undefined')
    //         return localStorage.getItem("image");
    //     return "/images/ali.png";
    // }

    return <ButtonBase style={{ width: "100%" }}> <Grid container direction="row" style={{ marginTop: '1rem' }}>
        <Avatar alt="Mehdi" src={props.src} style={{ marginLeft: 10 }} />
        <Grid item >
            <Typography align="right">{props.name}</Typography>
            <Typography variant="caption" align="right" color="textSecondary">{props.id}</Typography>
        </Grid>
    </Grid>
    </ButtonBase>

}


// const tweeterdata = [
// {
//     name: "Mehdi",
//     id: "@mehdi_jbr",
//     img: "/images/Mehdi.jpg"
// },
// {
//     name: "Ali",
//     id: "@Ali_Jbr",
//     img: "/images/ali.png"
// },
// {
//     name: "SAMSUNG",
//     id: "@Samsung",
//     img: "/images/samsung.png"
// },
// {
//     name: "Lenovo",
//     id: "@LENOVO",
//     img: "/images/lenovo.png"
// },
// ];


const LeftSidebar = (props) => {

    const classes = useStyles();


    const [user, setUser] = useState([]);
    const [anchorMenu, setAnchorMenu] = useState()
    const [imageFile, setImageFile] = useState()
    const [imagePath, setImagePath] = useState()
    const inputRef = useRef()


    useEffect(() => {
        getUsers((isOk, data) => {
            if (!isOk)
                return toast.error("ناموفق در گرفتن لیست کاربران")
            setUser(data);
        })
    }, []);


    const handleToggleMenu = (e) => {
        if (anchorMenu)
            setAnchorMenu(null)
        else {
            setAnchorMenu(e.currentTarget)
        }
    }


    const handleAvatarChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {

            setImageFile(e.target.files[0])

            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePath(e.target.result);
            };
            reader.readAsDataURL(e.target.files[0]);
            const formData = new FormData();
            formData.append("image", e.target.files[0]);
            uploadUserPhoto(formData, (isOk, data) => {
                if (!isOk)
                    return toast.error(data)
                toast.success("عکس شما با موفقیت آپلود شد")
                localStorage.setItem("image", data.imagePath)
            })
        }
    }



    const getimage = () => {
        if (imagePath)
            return imagePath;
        if (localStorage.getItem("image") && localStorage.getItem("image") !== 'undefined')
            return localStorage.getItem("image");
        return "/images/ali.png";
    }


    return (

        <div className={classes.root}>
            <Grid container direction="row-reverse" onClick={handleToggleMenu} style={{ cursor: 'pointer' }}>
                <Avatar alt="Mehdi" src={getimage()} style={{ marginRight: 10 }} />
                <Grid item >
                    <Typography align="left">{localStorage.getItem("name")}</Typography>
                    <Typography align="left" color="textSecondary">{localStorage.getItem("username")}</Typography>
                </Grid>
                <input ref={inputRef} type={'file'} style={{ display: "none" }} onChange={handleAvatarChange} />
            </Grid>


            {/* قسمت چپ بهترین خبرنگاران */}
            <Grid container direction={"column"} className={classes.tweeter}>
                <Typography className={classes.typo}>
                    بهترین خبرنگاران
            </Typography>
                <Divider style={{ marginBottom: '1rem' }} />

               
                    {
                        user.map((item, index) => {
                            return (
                                <Link to={`/users/${item._id}/${item.name}`} style={{ width: "100%" }}>
                                    < Tweeter name={item.username} src={item.image} id={item.username} />
                                    {
                                        index !== user.length - 1 &&
                                        <Divider style={{ marginBottom: '0.25rem', marginTop: '0.25rem' }} />
                                    }
                                </Link>
                            )
                        }

                        )
                    }
              

            </Grid>
            <Menu open={Boolean(anchorMenu)} onClose={() => setAnchorMenu(null)} anchorEl={anchorMenu}>
                <MenuItem onClick={() => { inputRef.current.click() }} >
                    ویرایش عکس
                    </MenuItem>
                <MenuItem onClick={() => { localStorage.clear(); window.location.reload() }}>خروج</MenuItem>
            </Menu>
        </div>
    );
}

export default LeftSidebar;