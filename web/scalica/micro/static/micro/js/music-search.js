(function initMusicSearch() {
  const searchLaunchers = document.getElementsByClassName('js-musicSearch__launcher');
  const searchInput = document.getElementById('js-musicSearch__input');

  for (var i = 0; i < searchLaunchers.length; i++) {
    const searchLauncher = searchLaunchers[i];

    searchLauncher.addEventListener('click', function(e) {
      const displayOverlay = function() {
        const overlay = document.getElementById('js-overlay');
        overlay.classList.remove('hidden');
      };

      displayOverlay();
    });
  }
})();
