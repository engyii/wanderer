# wanderer

version: 0.0.0

Some kind of replacement of Miller Medeiros [Hasher](http://millermedeiros.github.com/Hasher/) using full path (instead of hash path) and html5 history, Meant to be used with [crossroads](http://millermedeiros.github.com/crossroads.js/) on [SPA](http://en.wikipedia.org/wiki/Single-page_application) (instead of using the bloated, old, unmaintained [history.js](https://github.com/browserstate/history.js/). Not much useful otherwise, it's just using pushState to update url, listen to popstate and feed back url with events. Only compatible with evergreen browsers.


## Routes: Using Wanderer with Crossroads.js ##

```js
//setup crossroads
crossroads.addRoute('home');
crossroads.addRoute('lorem');
crossroads.addRoute('lorem/ipsum');
crossroads.routed.add(console.log, console); //log all routes

//setup wanderer
function parseUrl(newUrl, oldUrl){
  crossroads.parse(newUrl);
}
wanderer.initialized.add(parseUrl); // parse initial url
wanderer.changed.add(parseUrl); //parse url changes
wanderer.init(); //start listening for history change
```

## License ##

Released under the [MIT License](http://www.opensource.org/licenses/mit-license.php).

