import React from 'react';

import PostType from './PostType/PostType';

import './style.scss';

const PostTypes = React.createClass({
  render() {
    const types = this.props.types || [];

    return (
      <div className="postTypes">
        {types.map((type, i) => {
          return (
            <PostType
              key={i}
              type={type} />
          );
        })}
      </div>
    );
  }
});

export default PostTypes;
