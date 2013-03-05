# Building

In order to use CommonJS-style modules, the build requires [Node.js](http://nodejs.org/download/) and [browserify](https://github.com/substack/node-browserify). Node's package manager may be used to install browserify like this:

`npm install -g browserify`

You can build tilo like this:

`browserify src/tilo.js -o build/tilo.js`

For development, enable the _watch_ flag:

`browserify src/tilo.js -o build/tilo.js -w`