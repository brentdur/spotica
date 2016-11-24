import React from 'react';

import './style.scss';

const EditorInput = React.createClass({
  componentDidMount() {
    const th = this;

    th.input.addEventListener('input', th.updateCounter);

    requestAnimationFrame(() => {
      th.initResizing();
    });
  },

  initResizing() {
  },

  updateCounter() {
    // TODO: get this from a constants file
    const MAX_POST_LENGTH = 140;
    const currLength = this.input.value.length;

    this.counter.textContent = currLength + '/' + MAX_POST_LENGTH;

    if (currLength > MAX_POST_LENGTH) {
      this.counter.classList.remove('text-warning');
      this.counter.classList.add('text-error');
    } else if (currLength/MAX_POST_LENGTH >= .9) {
      this.counter.classList.add('text-warning');
      this.counter.classList.remove('text-error');
    } else {
      this.counter.classList.remove('text-error');
      this.counter.classList.remove('text-warning');
    }
  },

  render() {
    return (
      <div>
        <textarea
          className="editorInput__field"
          placeholder="What's on your mind?"
          ref={ref => this.input = ref}>
        </textarea>

        <p
          className="editorInput__counter"
          ref={ref => this.counter = ref}>
          0/140
        </p>
      </div>
    );
  }
});

export default EditorInput;
