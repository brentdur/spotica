(function initEditor() {
  // Initialize the text area
  const inputField = document.getElementById('js-editorInput__field');
  const counter = document.getElementById('js-editor__counter');

  if (!inputField) return;
  var wordsPerLine;

  inputField.addEventListener('input', function() {
    const updateCounter = function() {
      // TODO: Get this from a constants file
      const MAX_POST_LEN = 140;
      var currlength = inputField.value.length;

      counter.textContent = currlength + '/' + MAX_POST_LEN;

      if (currlength > MAX_POST_LEN) {
        counter.classList.remove('text-warning');
        counter.classList.add('text-error');
      } else if (currlength / MAX_POST_LEN >= .9) {
        counter.classList.add('text-warning');
        counter.classList.remove('text-error');
      } else {
        counter.classList.remove('text-error');
        counter.classList.remove('text-warning');
      }
    };

    const resizeField = function() {
      const hasUnderflow = function() {
        if (!wordsPerLine || inputField.rows === 2) return;

        var maxExpectedWordCount = wordsPerLine * inputField.rows;

        return (inputField.value.length / maxExpectedWordCount) < 1.2;
      };

      if (hasUnderflow()) {
        do {
          inputField.rows -= 1;
        } while (hasUnderflow());
      }

      const hasOverflow = function() {
        return inputField.scrollHeight > inputField.offsetHeight;
      };

      const recalculateWordsPerLine = function() {
        wordsPerLine = inputField.value.length / inputField.rows;
      };

      if (hasOverflow()) {
        do {
          recalculateWordsPerLine();
          inputField.rows += 1;
        } while (hasOverflow());
      }
    };

    updateCounter();
    resizeField();
  });
})();

(function initPostButton() {
  // Validate data
  const postButton = document.querySelector('.js-editor__submit');
  const inputField = document.getElementById('js-editorInput__field');

  if (!inputField || postButton) return;
  postButton.addEventListener('click', submitPost);

  function submitPost() {
    // Post text is blank & it isn't a song post
    // TODO: Display an error
    if (!inputField.value && !isSongPost) {
      return;
    }

    postButton.disabled = true;

    const songChoiceEl = document.querySelector('.songChoice');
    const isSongPost = songChoiceEl && songChoiceEl.innerHTML !== '';
    const MAX_POST_LEN = 140;
    var currlength = inputField.value.length;

    // Is below character limit
    // TODO: Display an error
    if (currlength > MAX_POST_LEN) {
      return;
    }

    var ajaxUrl = '/api/v1/posts/submit/';

    const postData = {
      text: inputField.value.trim(),
    };

    // What kind of post is it?
    if (isSongPost) {
      postData.spotify_uri = songChoiceEl.getAttribute('data-uri');
      ajaxUrl = '/api/v1/song_posts/submit/';
    }

    $.ajax({
      type: 'POST',
      datatype: 'json',
      data: postData,
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken'),
      },

      // TODO: replace this with a constant
      url: ajaxUrl,
    })
    .done(function (response, status, jqxhr) {
      renderPost(response);
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.log('The Spotify API seems to be down.');
    })
    .always(function() {
      postButton.disabled = false;

      // Clear post text field
      inputField.value = '';

      var inputEvent = document.createEvent('HTMLEvents');
      inputEvent.initEvent('input', false, true);
      inputField.dispatchEvent(inputEvent);

      // Clear the song choice
      const songChoiceHolder = document.getElementsByClassName('js-editor__songChoice');
      songChoiceHolder.innerHTML = '';
    });
  }
})();

(function initInfiniteScrolling() {
  var reachedPageEnd = false;

  window.onscroll = function(e) {
    const reachedPageEnd = window.innerHeight + window.scrollY >= document.body.offsetHeight;

    if (reachedPageEnd) queryNextPosts();
  };

})();

var areMorePosts = true;
var queryMorePosts = true;
function queryNextPosts() {
  if (!areMorePosts || !queryMorePosts) return;

  queryMorePosts = false;

  $.ajax({
      type: 'GET',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      // TODO: replace this with a constant
      url: '/api/v1/posts/query_more?last_id=' + post_list[post_list.length - 1],
    })
    .done(function (response, status, jqxhr) {
      const posts = response;

      if (posts.length === 0) {
        areMorePosts = false;
        queryMorePosts = false;
        return;
      }

      for (var i = 0; i < posts.length; i++) {
        renderPost(posts[i], true);
        post_list.push(posts[i].id);
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.log('We couldn\'t fetch more posts.');
    })
    .always(function() {
      queryMorePosts = true;
    });
}

function renderPost(post, addToEnd) {
  /**
   * Expects the post object to be structured as so: {
   *  pub_date
   *  spotify_uri
   *  text
   *  user: {
   *    username
   *   }
   *  }
   */

   const posts = document.getElementsByClassName('feed__posts')[0];

   const postEl = document.createElement('div');
   postEl.classList.add('post');

   // Author's picture
   const authorPic = document.createElement('img');
   authorPic.classList.add('post__authorPic');
   authorPic.src = '';

   postEl.appendChild(authorPic);

   // Post body
   const postBody = document.createElement('div');
   postBody.classList.add('post__body');

   const authorName = document.createElement('a');
   authorName.href = '#';

   authorName.innerHTML = post.user.username;

   const postTime = document.createElement('p');
   postTime.classList.add('post__published');
   postTime.textContent = 'Now';

   const postText = document.createElement('p');
   postText.classList.add('post__text');
   postText.textContent = post.text;

   postBody.appendChild(authorName);
   postBody.appendChild(postTime);
   postBody.appendChild(postText);

   postEl.appendChild(postBody);

   if (post.spotify_uri) {
    const songWidget = document.createElement('div');
    songWidget.classList.add('post__songWidget');

    const spotifyWidget = document.createElement('iframe');

    spotifyWidget.src = 'https://embed.spotify.com/?uri=' + post.spotify_uri;
    spotifyWidget.width = 420;
    spotifyWidget.height= 80
    spotifyWidget.frameBorder = 0;
    spotifyWidget.allowtransparency = true;

    songWidget.appendChild(spotifyWidget);
    postBody.appendChild(songWidget);
   }

   // Add post the top of the feed
   if (addToEnd !== true && posts.firstChild) {
    posts.insertBefore(postEl, posts.firstChild);
   } else {
    posts.appendChild(postEl);
   }
}
