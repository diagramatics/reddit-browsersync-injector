'use strict';

chrome.runtime.sendMessage({ 'inject': true }, function() {
	chrome.storage.sync.get({
		'active': true,
		'port': 3500
	}, function(response) {
		if (response.active) {
			var injectedStyle = '<link rel="stylesheet" href="//localhost:'+ response.port +'/css/style.css" title="applied_subreddit_stylesheet" type="text/css">';

			var body = document.querySelector('body');
			var script = document.createElement('script');
			script.src = '//localhost:'+ response.port +'/browser-sync/browser-sync-client.js';
			document.head.appendChild(script);

			// Find the custom subreddit styling
			var style = document.querySelector('link[title="applied_subreddit_stylesheet"]');
			if (style !== null) {
				style.insertAdjacentHTML('afterend', injectedStyle);
				style.remove();
			}
			else {
				var head = document.querySelector('head');
				head.insertAdjacentHTML('beforeend', injectedStyle);
			}
		}
	});
});
