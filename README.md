# wanderer

version: 0.0.0

Drop-in replacement fof Miller Medeiros [Hasher](http://millermedeiros.github.com/Hasher/) using full path (instead of # path) and html5 history, Meant to be used with [crossroads](http://millermedeiros.github.com/crossroads.js/) on SPA. Only compatible with evergreen browsers.


## Routes: Using Wanderer with Crossroads.js ##

```js
//setup crossroads
crossroads.addRoute('home');
crossroads.addRoute('lorem');
crossroads.addRoute('lorem/ipsum');
crossroads.routed.add(console.log, console); //log all routes

//setup wanderer
function parseURL(newUrl, oldUrl){
  crossroads.parse(newUrl);
}
wanderer.initialized.add(parseUrl); // parse initial url
wanderer.changed.add(parseUrl); //parse url changes
wanderer.init(); //start listening for history change
```

## License ##

Released under the [MIT License](http://www.opensource.org/licenses/mit-license.php).

