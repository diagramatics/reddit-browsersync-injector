'use strict';

(function() {
  var portInput = document.getElementById('port');
  var portErrorDiv = document.getElementById('portError');

  document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get({
      port: '3500'
    }, function(items) {
      portInput.value = items.port;
    });
  });

  // Check for errors
  var checkErrors = function(value, errorBox) {
    errorBox.innerHTML = '';
    if (value === '') {
      errorBox.insertAdjacentHTML('beforeend', '<br />Should not be empty.');
    }
    if (value.search(/\D/) !== -1) {
      errorBox.insertAdjacentHTML('beforeend', '<br />Should be numbers.');
    }
    if (value > 65535 || value < 1 || value.length > 5) {
      errorBox.insertAdjacentHTML('beforeend', '<br />Should be between 1-65535.');
    }

    return errorBox.innerHTML !== '';
  };

  portInput.addEventListener('keyup', function() {
    if (!checkErrors(this.value, portErrorDiv)) {
      chrome.storage.sync.set({
        port: Number(this.value)
      });
    }
  });
})();
