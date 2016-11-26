import $ from 'jquery';
import React from 'react';

import { SPOTIFY_API } from '../../js/constants';
import './style.scss';

const MusicSearch = React.createClass({
  getInitialState() {
    return { results: [] };
  },

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

    const SEARCH_LIMIT = 3;
    const SEARCH_TYPE = 'track';

    // TODO: Add loading/searching indicator

    $.ajax({
      type: 'GET',
      datatype: 'json',
      url: SPOTIFY_API.SEARCH + '?q=' + query + '&limit=' + SEARCH_LIMIT + '&type=' + SEARCH_TYPE,
      // TODO: Get an API key and use it here
    })
    .done((response, status, jqXHR) => {
      const results = response.tracks.items;

      if (results.length === 0) {
        this.displayError('Spotify couldn\'t find any matches for the query, \'' + query + '\'');
        return;
      }

      this.displayResults(results);
    })
    .fail((jqXHR, textStatus, errorThrown) => {
      this.displayError('The Spotify API seems to be done! :(');
    });
  },

  displayResults(results) {
    // TODO: remove loading/searching indicator
    this.input.classList.add('musicSearch-loaded');
    this.setState({ results: results });
  },

  removeResults() {
    this.input.classList.remove('musicSearch-loaded');
    this.setState({ results: [] });
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
      <div
        ref={ref => this.search = ref}
        className="musicSearch">
        <input
          ref={ref => this.input = ref}
          type="text"
          className="musicSearch__input"
          placeholder="Search for song by name or artist" />
        <p
          ref={ref => this.error = ref}
          className="musicSearch__error"></p>

        <div
          ref={ref => this.results = ref }
          className="musicSearch__results">
          {this.state.results.map((result) => {
            const albumCover = result.album.images[2] || {};
            const songTitle = result.name;

            // TODO: Join all artists together instead of using first
            const artist = result.artists[0].name || '';

            return (
              <div className="musicSearch__result">
                <img
                  className="musicSearch__album"
                  src={albumCover.url || ''}
                  height={albumCover.height}
                  width={albumCover.width} />

                <p className="musicSearch__song">
                  {songTitle}
                </p>

                <p className="musicSearch__artist">
                  {artist}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
});

export default MusicSearch;
