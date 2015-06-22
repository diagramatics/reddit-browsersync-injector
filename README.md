# Reddit BrowserSync injector

This is a Chrome Extension of an injector of BrowserSync for Reddit for developers to work on a subreddit stylesheet and have the live reloading available to them.

## Installing

Clone the repo and run `npm install` and `bower install`. After finishing package installation, run `grunt build` to compile a smaller version of the extension.

Open chrome://extensions and enable Developer Mode, then drag and drop the generated `dist` folder.

## Configuring

After installation of the extension, open Options. On the input box type in the port used by your build system's BrowserSync hosting the stylesheet and related image assets.
