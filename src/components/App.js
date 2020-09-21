import React from 'react'
import Layout from './layout/Layout'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Page from '../pages/page';
import TweetByHashTag from '../pages/tweetByHashtag/TweetByHashTag';
import TweetsUser from '../pages/tweetsUser/TweetsUser';
import Auth from '../pages/auth/Auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TweetProvider } from '../context/TweetContext';

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <PublcRuote path={"/login"} component={Auth} />
                    <PrivateRuote path={"/"} render={() => 
                        <TweetProvider>
                            <Layout> {/*HOC Component*/}
                                <Switch>
                                    <Route exact path={"/"} component={Home} />
                                    <Route exact path={"/hashtags/:hashtag"} component={TweetByHashTag} />
                                    <Route exact path={"/users/:id/:name"} component={TweetsUser} />
                                    <Route path={"/page"} component={Page} />
                                    {/* <Route path={"/page/:id"} component={Page}/> */}
                                </Switch>
                            </Layout>
                        </TweetProvider>
                    } />
                </Switch>
            </BrowserRouter>
            <ToastContainer />
        </div>
    );
}

const isLogin = () => !!localStorage.getItem("x-auth-token")//علامت های تعجب به این معناس که اگر لوکال استورج مقدار داشته باشد ترو و اگر خالی باشد فالس برمیگرداند

const PublcRuote = ({ component, ...props }) => {
    return <Route {...props} render={(props) => {
        if (isLogin())
            return <Redirect to={"/"} />
        else {
            return React.createElement(component, props)
        };
    }} />
};


const PrivateRuote = ({ render, ...props }) => {
    return <Route {...props} render={(props) => {
        if (isLogin())
            return render(props);
        else {
            return <Redirect to={"/login"} />
        }
    }} />
}

export default App;
