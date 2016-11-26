import React from 'react';

import './style.scss';

const MusicSearch = React.createClass({
  render() {
    return (
      <div className="musicSearch">
        <input
          ref={ref => this.input = ref}
          type="text"
          className="musicSearch__input"
          placeholder="Search for song by name or artist" />
      </div>
    );
  }
});

export default MusicSearch;
