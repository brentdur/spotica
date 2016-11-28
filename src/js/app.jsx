import React from 'react';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import ReactDOM from 'react-dom';

import Base from '../components/Base/Base';
import Home from '../components/pages/Home/Home';
import Music from '../components/pages/Music/Music';
import Login from '../components/pages/Login/Login';
import Settings from '../components/pages/Settings/Settings';

import '../css/main.scss';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Base}>
      <IndexRoute component={Home} />
      <Route path="login" component={Login} />
    </Route>
  </Router>,
  document.getElementById('container')
);
