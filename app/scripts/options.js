'use strict';

(function() {
  var errorDiv = document.getElementById('error');
  var portInput = document.getElementById('port');

  document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get({
      port: '3500'
    }, function(items) {
      portInput.value = items.port;
    });
  });

  // Check for errors
  var checkErrors = function() {
    var value = portInput.value;
    errorDiv.innerHTML = '';
    if (value === '') {
      errorDiv.insertAdjacentHTML('beforeend', '<br />Should not be empty.');
    }
    if (value.search(/\D/) !== -1) {
      errorDiv.insertAdjacentHTML('beforeend', '<br />Should be numbers.');
    }
    if (value > 65535 || value < 1 || value.length > 5) {
      errorDiv.insertAdjacentHTML('beforeend', '<br />Should be between 1-65535.');
    }

    return errorDiv.innerHTML !== '';
  };

  portInput.addEventListener('keyup', function() {
    if (!checkErrors()) {
      chrome.storage.sync.set({
        port: Number(portInput.value)
      });
    }
  });
})();
