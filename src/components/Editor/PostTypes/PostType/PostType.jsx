import React from 'react';

import Button from '../../../Button/Button';

import './style.scss';

const PostType = React.createClass({
  render() {
    const icon = this.props.type.icon || '';
    const text = this.props.type.text || '';

    return (
      <Button
        className="postType"
        icon={icon}
        iconColor="grey">
        {text}
      </Button>
    );
  }
});

export default PostType;
