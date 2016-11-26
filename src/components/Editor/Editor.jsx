import React from 'react';

import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import Overlay from '../Overlay/Overlay';
import MusicSearch from '../MusicSearch/MusicSearch';
import SongChoice from './SongChoice/SongChoice';
import EditorInput from './EditorInput/EditorInput';
import PostTypes from './PostTypes/PostTypes';

import './style.scss';

const Editor = React.createClass({
  getInitialState() {
    return {
      overlay: undefined,
      songChoice: undefined,
    };
  },

  openMusicSearch() {
    const overlay = (
      <Overlay
        close={this.closeOverlay}>
        <MusicSearch
          selectResult={this.selectSong} />
      </Overlay>
    );

    this.setState({ overlay: overlay });
  },

  closeOverlay() {
    this.setState({ overlay: null });
  },

  selectSong(songData) {
    this.closeOverlay();

    const songChoice = (
      <SongChoice
        data={songData} />
    );

    this.setState({ songChoice: songChoice });
  },

  removeSong() {
    this.setState({ selectedSong: undefined });
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

          {this.state.songChoice}

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
