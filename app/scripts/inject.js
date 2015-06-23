'use strict';

chrome.extension.sendMessage({}, function() {
	var readyStateCheckInterval = setInterval(function() {
		if (document.readyState === 'complete') {
			clearInterval(readyStateCheckInterval);
			chrome.storage.sync.get({
				'stylePort': 3500,
				'bsPort': 3501
			}, function(response) {
				var injectedStyle = '<link rel="stylesheet" href="http://localhost:'+ response.stylePort +'/css/style.css" title="applied_subreddit_stylesheet" type="text/css">';

				var body = document.querySelector('body');
				body.insertAdjacentHTML('beforeend', '<script async src="//localhost:'+ response.bsPort +'/browser-sync/browser-sync-client.js"><\/script>');

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
				console.log('Alright, development is a go!');
			});
		}
	}, 10);
});
