/*! wanderer v0.0.0 | (c) 2015 @engy | https://github.com/engyii/wanderer | license MIT */
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['signals'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('signals'));
  } else {
    root.wanderer = factory(root.signals);
  }
}(this, function(signals) {
/*global signals:true */
'use strict';

//--------------------------------------------------------------------------------------
// Private Vars
//--------------------------------------------------------------------------------------

var Signals = signals.Signal;
var history = window.history;
var _isActive;
var _url;
var wanderer;
var _oldUrl;

//--------------------------------------------------------------------------------------
// Private Methods
//--------------------------------------------------------------------------------------

function _getURL() {
  var path = window.location.pathname + window.location.search;
  try {
    return wanderer.raw ? path : decodeURIComponent(path);
  } catch (e) {
    return path;
  }
}

function _registerChange(newUrl) {
  if (_url !== newUrl) {
    _oldUrl = _url;
    _url = newUrl;
    wanderer.changed.dispatch(newUrl, _oldUrl);
  }
}

function _checkURL() {
  var windowURL = _getURL();
  if (windowURL !== _url) {
    _registerChange(windowURL);
  }
}

//--------------------------------------------------------------------------------------
// Public (API)
//--------------------------------------------------------------------------------------

var wanderer = {

  stopped: new Signals(),

  initialized: new Signals(),

  changed: new Signals(),

  raw: false,

  isActive: function() {
    return _isActive;
  },

  init: function() {
    if (_isActive) {
      return;
    }

    _url = _getURL();
    window.addEventListener('popstate', _checkURL);
    _isActive = true;
    wanderer.initialized.dispatch(_url);
  },

  stop: function() {
    if (!_isActive) {
      return;
    }
    window.removeListener('popstate', _checkURL);
    _isActive = false;
    wanderer.stopped.dispatch(_url);
  },

  setURL: function(path) {
    if (path !== _url) {
      _registerChange(path);
      if (path === _url) {
        if (!wanderer.raw) {
          path = encodeURI(path); //used encodeURI instead of encodeURIComponent to preserve '?', '/',
        }
        history.pushState(null, null, path);
      }
    }
  },

  getURL: function() {
    return _getURL();
  },

  replaceURL: function(path) {
    if (path !== _url) {
      _registerChange(path);
      if (path === _url) {
        if (!wanderer.raw) {
          path = encodeURI(path); //used encodeURI instead of encodeURIComponent to preserve '?', '/',
        }
        history.replaceState(null, null, path);
      }
    }
  },

  getUrlArray:function () {
    return wanderer.getURL().split('/');
  },

  setUrlArray:function (paths) {
    var path = paths.join('/');
    wanderer.setURL(path);
  },

  dispose: function() {
    wanderer.stop();
    wanderer.initialized.dispose();
    wanderer.stopped.dispose();
    wanderer.changed.dispose();
    wanderer = null;
  }
};

wanderer.initialized.memorize = true;

return wanderer;
}));
