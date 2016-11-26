import React from 'react';

import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import Overlay from '../Overlay/Overlay';
import MusicSearch from '../MusicSearch/MusicSearch';
import EditorInput from './EditorInput/EditorInput';
import PostTypes from './PostTypes/PostTypes';

import './style.scss';

const Editor = React.createClass({
  getInitialState() {
    return { overlay: null };
  },

  openMusicSearch() {
    const closeOverlay = () => {
      this.setState({ overlay: null });
    }

    const overlay = (
      <Overlay
        close={closeOverlay}>
        <MusicSearch />
      </Overlay>
    );

    this.setState({ overlay: overlay });
  },

  render() {
    const postTypes = [{
      text: 'Add music',
      icon: 'music_note',
      action: this.openMusicSearch,
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

        {this.state.overlay}
      </div>
    );
  }
});

export default Editor;
