# Building

In order to use CommonJS-style modules, the build requires [Node.js](http://nodejs.org/download/) and [browserify](https://github.com/substack/node-browserify). Node's package manager may be used to install browserify like this:

`npm install -g browserify`

You can build tilo like this:

`browserify src/tilo.js -o build/tilo.js`

For development, user [watchify](https://github.com/substack/watchify):

`watchify src/tilo.js -o build/tilo.js -v`

# License

All files _except images_ are covered under the MIT license described in LICENSE.md.