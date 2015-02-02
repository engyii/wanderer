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
    var oldUrl = _url;
    _url = newUrl;
    wanderer.changed.dispatch(newUrl, oldUrl);
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

  dispose: function() {
    wanderer.stop();
    wanderer.initialized.dispose();
    wanderer.stopped.dispose();
    wanderer.changed.dispose();
    wanderer = null;
  }
};

wanderer.initialized.memorize = true;
