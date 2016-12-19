(function initOverlay() {
  const overlay = document.getElementById('js-overlay');

  const closeOverlay = function() {
    overlay.classList.add('hidden');
  };

  // Initialize close listeners
  overlay.addEventListener('click', function(e) {
    const componentName = 'overlay';
    const containerName = 'overlay__container';

    // Bubble up through the dividers to check that we clicked outside
    // of the content
    var currTarget = e.target;

    while (!currTarget.classList.contains(componentName)) {
      if (currTarget.classList.contains(containerName)) {
        return;
      }

      currTarget = currTarget.parentNode;
    }

    closeOverlay();

    const closeOnEsc = function(e) {
      if (e.keyCode === 27) {
        closeOverlay();
      }
    };

    addEventListener('keyup', closeOnEsc);
  });
})();
