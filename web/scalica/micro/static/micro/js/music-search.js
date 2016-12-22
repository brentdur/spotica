(function initMusicSearch() {
  // Opening the music search modal
  const overlay = document.getElementById('js-overlay');
  const searchLaunchers = document.getElementsByClassName('js-musicSearch__launcher');
  const searchResults = document.getElementsByClassName('js-musicSearch__results');

  for (var i = 0; i < searchLaunchers.length; i++) {
    const searchLauncher = searchLaunchers[i];

    searchLauncher.addEventListener('click', function(e) {
      const displayOverlay = function() {
        overlay.classList.remove('hidden');
      };

      displayOverlay();
    });
  }

  // Initializing the search input
  const searchInput = document.getElementById('js-musicSearch__input');

  const displayError = function(message) {
    if (!message) return;

    const searchErrorEls = document.getElementsByClassName('js-musicSearch__error');

    for (var i = 0; i < searchErrorEls.length; i++) {
      searchErrorEls[i].textContent = message;
      searchErrorEls[i].classList.remove('hidden');
    }
  };

  const hideError = function() {
    const searchErrorEls = document.getElementsByClassName('js-musicSearch__error');

    for (var i = 0; i < searchErrorEls.length; i++) {
      searchErrorEls[i].classList.add('hidden');
    }
  };

  const displayResults = function(results) {
    searchInput.classList.add('musicSearch-loaded');

    const selectResult = function(result) {
      const closeOverlay = function() {
        overlay.classList.add('hidden');
      };

      closeOverlay();

      // Add Spotify Widget to the song choice
      const songChoice = document.createElement('div');
      songChoice.classList.add('songChoice');

      // Song choice's album cover
      const albumData = result.album.images[1] || {};
      const albumCover = document.createElement('img');

      albumCover.classList.add('songChoice__album');
      albumCover.src = albumData.url;
      songChoice.appendChild(albumCover);

      const songDetails = document.createElement('div');
      songDetails.classList.add('songChoice__details');

      // Song name
      const songName = document.createElement('p');
      const songTitle = result.name;

      songName.classList.add('songChoice__song');
      songName.textContent = songTitle;
      songDetails.appendChild(songName);

      // Artist name
      const artist = document.createElement('p');
      const artistName = result.artists[0].name;

      artist.classList.add('songChoice__artist');
      artist.textContent = artistName;
      songDetails.appendChild(artist);
      songChoice.appendChild(songDetails);
      songChoice.setAttribute('data-uri', result.uri)

      // Add it to the song choice display
      const songChoiceHolders = document.getElementsByClassName('js-editor__songChoice');

      for (var i = 0; i < songChoiceHolders.length; i++) {
        // Clear it in case previous choice was made
        songChoiceHolders[i].innerHTML = '';

        songChoiceHolders[i].appendChild(songChoice);
      }
    };

    for (var i = 0; i < searchResults.length; i++) {
      const searchResultsEl = searchResults[i];

      searchResultsEl.innerHTML = '';

      for (var j = 0; j < results.length; j++) {
        const result = results[j];

        // Create a search result element
        const searchResult = document.createElement('div');
        searchResult.classList.add('searchResult');
        searchResult.addEventListener('click', selectResult.bind(searchResult, result));

        const albumData = result.album.images[2] || {};
        const artistData = result.artists[0] || '';

        const albumCover = document.createElement('img');
        albumCover.classList.add('searchResult__album');
        albumCover.src = albumData.url || '';
        albumCover.height = albumData.height;
        albumCover.width = albumData.width;

        searchResult.appendChild(albumCover);

        const songName = document.createElement('p');
        songName.classList.add('searchResult__song');
        songName.textContent = result.name || '';

        searchResult.appendChild(songName);

        const artistName = document.createElement('p');
        artistName.classList.add('searchResult__artist');
        artistName.textContent = artistData.name;

        searchResult.appendChild(artistName);

        // Add it to the search results
        searchResultsEl.appendChild(searchResult);
      }
    }
  };

  const searchSong = function() {
    const query = searchInput.value;

    if (!query) {
      displayError('Please specify a song to search for.');
      return;
    }

    // TODO: take these numbers from a constants file
    const SEARCH_LIMIT = 3;
    const SEARCH_TYPE = 'track';

    // TODO: Add loading/searching indicator
    $.ajax({
      type: 'GET',
      datatype: 'json',
      // TODO: replace this with a constant
      url: 'https://api.spotify.com/v1/search' + '?q=' + query + '&limit=' + SEARCH_LIMIT + '&type=' + SEARCH_TYPE,
      // TODO: get a private API key and use it here
    })
    .done(function (response, status, jqxhr) {
      const results = response.tracks.items;

      if (results.length === 0) {
        displayError('Spotify couldn\'t find any matching songs. Sorry!');
        return;
      }

      displayResults(results);
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      displayError('The Spotify API seems to be down.');
    });
  };

  searchInput.addEventListener('keyup', function(e) {
    if (e.keyCode === 13) {
      searchSong();
    } else {
      hideError();
    }
  });
})();
