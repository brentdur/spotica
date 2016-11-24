import React from 'react';

import Icon from '../Icon/Icon';
import './style.scss';

const Editor = React.createClass({
  render() {
    return (
      <div>
        <div>
          <input
            type="text"
            placeholder="What's on your mind?" />

          <div>
            <button>
              <Icon>music_note</Icon>
              Add music
            </button>
          </div>
        </div>

        <button>Post</button>
      </div>
    );
  }
});

export default Editor;
