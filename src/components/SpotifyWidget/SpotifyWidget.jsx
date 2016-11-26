import React from 'react';

import './style.scss';

const SpotifyWidget = React.createClass({
  render() {
    const songSrc = 'https://embed.spotify.com/?uri=' + this.props.uri;

    return (
      <div className="spotifyWidget">
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
