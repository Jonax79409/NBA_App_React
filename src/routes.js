import React from 'react';
import { Switch } from 'react-router-dom';


import Home from './components/Home/home.js'
import Layout from './hoc/Layout/layout.js'


import NewsArticle from './components/Articles/News/Post/index.js';
import VideoArticle from './components/Articles/Videos/Video/index.js';
import NewsMain from './components/Articles/News/Main/index.js';
import VideoMain from './components/Articles/Videos/Main/index.js';
import SignIn from './components/signin/signin.js';
import Dashboard from './components/dashboard/dashboard.js';

import PrivateRoute from './components/AuthRoutes/privateRoutes.js';
import PublicRoute from './components/AuthRoutes/publicRoutes.js';

const Routes = (props) => {
    
    return (
        <Layout user={props.user}>
            <Switch>
                <PublicRoute {...props} restricted = {false} path="/" exact component = {Home}/>
                <PublicRoute {...props} restricted = {false} path="/news" exact component = {NewsMain}/>
                <PublicRoute {...props} restricted = {false} path="/articles/:id" exact component={NewsArticle}/>
                <PublicRoute {...props} restricted = {false} path="/videos/:id" exact component={VideoArticle}/>
                <PublicRoute {...props} restricted = {false} path="/videos" exact component={VideoMain}/>
                <PublicRoute {...props} restricted = {true} path="/sign-in" exact component={SignIn}/>
                <PrivateRoute {...props} path="/dashboard" exact component={Dashboard}/>
            </Switch>
        </Layout>
    )

}

export default Routes;