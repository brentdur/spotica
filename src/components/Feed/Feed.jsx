import React from 'react';

import TextPost from './TextPost/TextPost';
import MusicPost from './MusicPost/MusicPost';

import './style.scss';

const Feed = React.createClass({
  generateTabs() {
    const tabs = this.props.tabs;

    if (!tabs || tabs.length === 0) return;

    return (
      <div className="feed__tabs">
        {tabs.map((tab, i) => {
          return (
            <div
              className="feed__tab"
              key={i}>
              {tab}
            </div>
          );
        })}
      </div>
    );
  },

  render() {
    const posts = this.props.posts || [];

    return (
      <div className="feed">
        {this.generateTabs()}

        {posts.map((post) => {
          // TODO: make constants
          if (post.type === 'TEXT_POST') {
            <TextPost />
          } else if (post.type === 'MUSIC_POST') {
            <MusicPost />
          }
        })}
      </div>
    );
  }
});

export default Feed;
