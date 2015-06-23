'use strict';

(function() {
  var stylePortInput = document.getElementById('stylePort');
  var stylePortErrorDiv = document.getElementById('stylePortError');
  var bsPortInput = document.getElementById('bsPort');
  var bsPortErrorDiv = document.getElementById('bsPortError');

  document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get({
      stylePort: '3500',
      bsPort: '3501'
    }, function(items) {
      stylePortInput.value = items.stylePort;
      bsPortInput.value = items.bsPort;
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

  stylePortInput.addEventListener('keyup', function() {
    if (!checkErrors(this.value, stylePortErrorDiv)) {
      chrome.storage.sync.set({
        stylePort: Number(this.value)
      });
    }
  });

  bsPortInput.addEventListener('keyup', function() {
    if (!checkErrors(this.value, bsPortErrorDiv)) {
      chrome.storage.sync.set({
        bsPort: Number(this.value)
      });
    }
  });
})();
