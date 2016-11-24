import React from 'react';

import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import PostTypes from './PostTypes/PostTypes';

import './style.scss';

const Editor = React.createClass({
  render() {
    const postTypes = [{
      text: 'Add music',
      icon: 'music_note',
    }];

    return (
      <div className="editor">
        <div className="editor__container">
          <textarea
            className="editor__input"
            placeholder="What's on your mind?">
          </textarea>

          <PostTypes
            types={postTypes} />
        </div>

        <Button className="primary editor__submit">Post</Button>
      </div>
    );
  }
});

export default Editor;
