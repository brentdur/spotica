import React from 'react';

import * as constants from '../../../js/constants';
import './style.scss';

const EditorInput = React.createClass({
  componentDidMount() {
    this.input.addEventListener('input', () => {
      this.updateCounter();
      this.resizeField();
    });

    requestAnimationFrame(() => {
      this.initResizing();
    });
  },

  initResizing() {
    // The height of a single input line
    this.lineHeight = this.input.offsetHeight / this.input.size;
  },

  resizeField() {
    const hasUnderflow = () => {
      if (!this.wordsPerLine || this.input.rows === 2) return;

      const maxExpectedWordCount = this.wordsPerLine  * this.input.rows;

      return (this.input.value.length / maxExpectedWordCount) < 1.2;
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
    const MAX_POST_LEN = constants.MAX_POST_LEN;
    const currLength = this.input.value.length;

    this.counter.textContent = currLength + '/' + MAX_POST_LEN;

    if (currLength > MAX_POST_LEN) {
      this.counter.classList.remove('text-warning');
      this.counter.classList.add('text-error');
    } else if (currLength/MAX_POST_LEN >= .9) {
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
          0/{constants.MAX_POST_LEN}
        </p>
      </div>
    );
  }
});

export default EditorInput;
