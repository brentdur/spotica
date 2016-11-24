import React from 'react';

import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import EditorInput from './EditorInput/EditorInput';
import PostTypes from './PostTypes/PostTypes';

import './style.scss';

const Editor = React.createClass({
  componentDidMount() {},

  render() {
    const postTypes = [{
      text: 'Add music',
      icon: 'music_note',
    }];

    return (
      <div className="editor">
        <div className="editor__container">
          <EditorInput
            ref={ref => this.input = ref} />
          <PostTypes
            types={postTypes} />
        </div>

        <Button className="primary editor__submit">Post</Button>
      </div>
    );
  }
});

export default Editor;
