import React from 'react';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import ReactDOM from 'react-dom';

import Base from '../components/Base/Base';
import Home from '../components/pages/Home/Home';

import '../css/main.scss';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Base}>
      <IndexRoute component={Home} />
    </Route>
  </Router>,
  document.getElementById('container')
);
