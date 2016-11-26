import React from 'react';

import './style.scss';

const EditorInput = React.createClass({
  componentDidMount() {
    const th = this;

    th.input.addEventListener('input', () => {
      th.updateCounter();
      th.resizeField();
    });

    requestAnimationFrame(() => {
      th.initResizing();
    });
  },

  initResizing() {
    // Get the height of a single input line
    // Note: textareas have two lines by default
    this.lineHeight = this.input.offsetHeight / 2;

    // this.input.rows += 1;
  },

  resizeField() {
    const hasUnderflow = () => {
      if (!this.wordsPerLine || this.input.rows === 2) return;
      return (this.input.value.length / (this.wordsPerLine  * this.input.rows)) < 1.2;
    }

    if (hasUnderflow()) {
      do {
        this.input.rows -= 1;
      } while (hasUnderflow());
    }

    const hasOverflow = () => {
      return this.input.scrollHeight > this.input.offsetHeight;
    }

    const recalculateWordsPerLine = () => {
      this.wordsPerLine = this.input.value.length / this.input.rows;
    }

    if (hasOverflow()) {
      do {
        recalculateWordsPerLine();
        this.input.rows += 1;
      } while (hasOverflow());
    }
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
          rows={2}
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
