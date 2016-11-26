import React from 'react';

import './style.scss';

const MusicSearch = React.createClass({
  componentDidMount() {
    this.input.addEventListener('keyup', (e) => {
      if (e.keyCode === 13) {
        this.searchSong();
      } else {
        this.hideError();
      }
    });
  },

  searchSong() {
    const query = this.input.value;

    if (!query) {
      this.displayError('Please specify a song to search for.');
      return;
    }
  },

  displayError(message) {
    if (!message) return;

    this.error.textContent = message;
    this.error.classList.remove('hidden');
  },

  hideError() {
    this.error.classList.add('hidden');
  },

  render() {
    return (
      <div className="musicSearch">
        <input
          ref={ref => this.input = ref}
          type="text"
          className="musicSearch__input"
          placeholder="Search for song by name or artist" />
        <p
          ref={ref => this.error = ref}
          className="musicSearch__error"></p>
        <div className="musicSearch__results">
        </div>
      </div>
    );
  }
});

export default MusicSearch;
