import React from 'react';

import Tab from './Tab/Tab';
import TextPost from './TextPost/TextPost';
import MusicPost from './MusicPost/MusicPost';

import './style.scss';

const Feed = React.createClass({
  getInitialState() {
    return { posts: this.props.posts || [] };
  },

  generateTabs() {
    const tabs = this.props.tabs;

    if (!tabs || tabs.length === 0) return;

    return (
      <div className="feed__tabs">
        {tabs.map((tab, i) => {
          return (
            <Tab
              key={i}
              text={tab}
              onClick={() => this.filterPosts(tab)}
              isActive={i === 0} />
          );
        })}
      </div>
    );
  },

  generateEmptyState() {
    if (this.state.posts.length > 0)  return;

    return (
      <div className="feed__emptyState">
        <h2>There are no posts.</h2>
        <p>Write the first post!</p>
        <a href="">Find users</a>
      </div>
    );
  },

  filterPosts(type) {
    console.log()
  },

  render() {
    return (
      <div className="feed">
        {this.generateTabs()}

        {this.state.posts.map((post) => {
          // TODO: make constants
          if (post.type === 'TEXT_POST') {
            <TextPost />
          } else if (post.type === 'MUSIC_POST') {
            <MusicPost />
          }
        })}
        {this.generateEmptyState()}
      </div>
    );
  }
});

export default Feed;
