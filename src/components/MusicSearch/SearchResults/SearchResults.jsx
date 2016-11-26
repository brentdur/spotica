import React from 'react';

import './style.scss';

const SearchResults = React.createClass({
  selectResult(data) {
    this.props.selectResult(data);
  },

  render() {
    return (
      <div className="searchResults">
        {this.props.results.map((result, i) => {
          const albumCover = result.album.images[2] || {};
          const songTitle = result.name;

          // TODO: Join all artists together instead of using first
          const artist = result.artists[0].name || '';

          return (
            <div
              key={i}
              className="searchResult"
              onClick={() => this.selectResult(result)}>
              <img
                className="searchResult__album"
                src={albumCover.url || ''}
                height={albumCover.height}
                width={albumCover.width} />

              <p className="searchResult__song">
                {songTitle}
              </p>

              <p className="searchResult__artist">
                {artist}
              </p>
            </div>
          );
        })}
      </div>
    );
  }
});

export default SearchResults;
