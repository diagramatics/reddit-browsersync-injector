'use strict';

chrome.extension.sendMessage({}, function() {
	var readyStateCheckInterval = setInterval(function() {
		if (document.readyState === 'complete') {
			clearInterval(readyStateCheckInterval);

			var injectedStyle = '<link rel="stylesheet" href="http://localhost:3500/css/style.css" title="applied_subreddit_stylesheet" type="text/css">';

			var body = document.querySelector('body');
			body.insertAdjacentHTML('beforeend', '<script async src="//localhost:3500/browser-sync/browser-sync-client.js"><\/script>');

			chrome.storage.sync.get({'port': 3500}, function(response) {
				console.log(response);
			});
			// Find the custom subreddit styling
			var style = document.querySelector('link[title="applied_subreddit_stylesheet"]');
			if (style !== null) {
				style.insertAdjacentHTML('afterend', '<link rel="stylesheet" href="//localhost:3500/css/style.css" title="applied_subreddit_stylesheet" type="text/css">');
				style.remove();
			}
			else {
				var head = document.querySelector('head');
				head.insertAdjacentHTML('beforeend', injectedStyle);
			}

		}
	}, 10);
});
