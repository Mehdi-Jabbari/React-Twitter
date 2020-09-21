import React, { useState } from 'react'
import { Paper, Typography, Tabs, Tab, Input, Button } from '@material-ui/core'
import useStyles from './styles'
import { toast } from 'react-toastify';
import { LoginApi, registerApi } from '../../api/api_auth';

const LOGIN_TAB_VALUE = 1;
const REG_TAB_VALUE = 2;



const Auth = () => {

    const classes = useStyles();
    const [tab, settab] = useState(LOGIN_TAB_VALUE);

    //login state
    const [usernameLogin, setUsernameLogin] = useState();
    const [passwordLogin, setPasswordLogin] = useState();


    //Register state
    const [fullNameRegister, setFullNameRegister] = useState();
    const [usernameRegister, setUsernameRegister] = useState();
    const [passwordRegister, setPasswordRegister] = useState();
    const [confPasswordRegister, setConfPasswordRegister] = useState();




    const handleChange = (e, newValue) => {
        settab(newValue)
    }

    const validateLogin = (user) => {
        if (!user.username)
            return "باید حتما نام کاربری را وارد کنید"
        if (!user.password)
            return "باید حتما پسورد را وارد کنید"
    }

    const validateRegister = (user) => {
        if (!user.username)
            return "باید حتما نام کاربری را وارد کنید"
        if (!user.name)
            return "باید حتما نام خود را وارد کنید"
        if (!user.password)
            return "باید حتما پسورد را وارد کنید"
        if (user.password !== user.confPasswordRegister)
            return "رمزها باید مشابه باشند"
    }

    const handleRegister = () => {
        const user = {
            name: fullNameRegister,
            username: usernameRegister,
            password: passwordRegister,
            confPasswordRegister: confPasswordRegister,
        };
        const error = validateRegister(user);
        if (error)
            return toast.warn(error);
        user.confPasswordRegister = undefined;
            registerApi(user, (isOk, data) => { //ارسال اطلاعات با متد پست به سرور
                if (!isOk)
                    return toast.error(data);
                toast.success("ثبت نام شما با موفقیت انجام شد");

                //‌ذخیره اطلاعات دریافتی در مرور گر
                localStorage.setItem("name", data.name);
                localStorage.setItem("image", data.image);
                localStorage.setItem("username", data.username);
                localStorage.setItem("x-auth-token", data["x-auth-token"]);
                window.location.reload();
            })

    }

    const handleClick = () => {
        const user = {
            username: usernameLogin,
            password: passwordLogin
        };
        const error = validateLogin(user);
        if (error)
            return toast.warn(error);
        LoginApi(user, (isOk, data) => { //ارسال اطلاعات با متد پست به سرور
            if (!isOk)
                return toast.error(data);
            toast.success("شما با موفقیت وارد شدید");

            //‌ذخیره اطلاعات دریافتی در مرور گر
            localStorage.setItem("name", data.name);
            localStorage.setItem("image", data.image);
            localStorage.setItem("username", data.username);
            localStorage.setItem("x-auth-token", data["x-auth-token"]);
            window.location.reload();
        })
    }

    return (
        <Paper className={classes.container}>
            <Typography className={classes.headertext}>خوش آمدید.</Typography>

            <Tabs
                value={tab}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
                aria-label="disabled tabs example"
            >
                <Tab label="ورود" value={LOGIN_TAB_VALUE} className={classes.tab} />
                <Tab label="ثبت نام" value={REG_TAB_VALUE} className={classes.tab} />

            </Tabs>

            {
                tab === LOGIN_TAB_VALUE &&
                <div className={classes.containerInput}>
                    <Typography>نام کاربری</Typography>
                    <Input className={"m_b_small"}
                        value={usernameLogin} onChange={e => setUsernameLogin(e.target.value)}>
                    </Input>
                    <Typography>رمز عبور</Typography>
                    <Input className={"m_b_small"}
                        value={passwordLogin} onChange={e => setPasswordLogin(e.target.value)}>

                    </Input>
                    <Button className={classes.btn} variant={"contained"} color={"primary"}
                        onClick={handleClick}
                    >
                        ورود</Button>
                </div>
            }
            {
                tab === REG_TAB_VALUE &&
                <div className={classes.containerInput}>
                    <Typography>نام کامل</Typography>
                    <Input className={"m_b_small"}
                        value={fullNameRegister} onChange={e => setFullNameRegister(e.target.value)}>

                    </Input>
                    <Typography>نام کاربری</Typography>
                    <Input className={"m_b_small"}
                        value={usernameRegister} onChange={e => setUsernameRegister(e.target.value)}>

                    </Input>
                    <Typography>رمز عبور</Typography>
                    <Input className={"m_b_small"}
                        value={passwordRegister} onChange={e => setPasswordRegister(e.target.value)}>

                    </Input>
                    <Typography>تکرار رمز عبور </Typography>
                    <Input className={"m_b_small"}
                        value={confPasswordRegister} onChange={e => setConfPasswordRegister(e.target.value)}>

                    </Input>
                    <Button className={classes.btn} variant={"contained"} color={"primary"} onClick={handleRegister}>
                        ثبت نام
                        </Button>
                </div>
            }
        </Paper>
    )
}

export default Auth;
