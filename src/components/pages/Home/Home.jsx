import React from 'react';

import Editor from '../../Editor/Editor';
import Feed from '../../Feed/Feed';

import './style.scss';

const Home = React.createClass({
  render() {
    const tabs = ['All', 'You'];

    return (
      <div>
        <Editor />
        <Feed
          tabs={tabs} />
      </div>
    );
  }
});

export default Home;
