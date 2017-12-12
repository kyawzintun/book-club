import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/home/home';
import Profile from './components/profile/profile';
import About from './components/about/about';
import Login from './components/login/login';
import Signup from './components/signup/signup';
import NotFound from './components/not-found/404';

const Routes = (props) => (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/profile' component={Profile} />
      <Route exact path='/about' component={About} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/signup' component={Signup} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Routes;