import React from 'react';

import './style.scss';

const SpotifyWidget = React.createClass({
  render() {
    const songSrc = 'https://embed.spotify.com/?uri=' + this.props.uri;

    return (
      <div className="spotifyWidget">
        <p className="spotifyWidget__title">
          Embedded song
        </p>
        <iframe
          className="spotifyWidget__widget"
          src={songSrc}
          frameBorder="0"
          allowTransparency="true">
        </iframe>
      </div>
    );
  }
});

export default SpotifyWidget;
