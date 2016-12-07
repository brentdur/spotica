(function initEditor() {
  // Initialize the text area
  const inputField = document.getElementById('js-editorInput__field');
  const counter = document.getElementById('js-editor__counter');

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
