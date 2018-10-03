import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import './styles.scss';
import Footer from 'components/Footer';
import Auth from 'components/Auth';
import Nav from 'components/Nav';
import Navigation from '../Navigation/presenter';

const App = props => [
  props.isLoggedIn ? <Navigation key={1} /> : null,
  props.isLoggedIn ? <PrivateRoutes key={2} /> : <PublicRoutes key={2} />,
  <Footer key={3} />,
];

App.PropTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

const PrivateRoutes = props => (
  <Switch>
    <Route exact path="/" render={() => 'feed'} />
    <Route exact path="/explore" render={() => 'explore'} />
  </Switch>
);

const PublicRoutes = props => (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Route exact path="/forgot" render={() => 'password'} />
  </Switch>
);

export default App;
