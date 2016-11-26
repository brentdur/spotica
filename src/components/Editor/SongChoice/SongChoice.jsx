import React from 'react';

import './style.scss';

const SongChoice = React.createClass({
  render() {
    this.data = this.props.data;

    const songTitle = this.data.name;
    const albumCover = this.data.album.images[1] || {};

    // TODO: Join all artists together instead of using first
    const artist = this.data.artists[0].name || '';

    return (
      <div className="songChoice">
        <img
          className="songChoice__album"
          src={albumCover.url || ''} />

        <div className="songChoice__details">
          <p className="songChoice__song">{songTitle}</p>
          <p className="songChoice__artist">{artist}</p>
        </div>
      </div>
    );
  }
});

export default SongChoice;
