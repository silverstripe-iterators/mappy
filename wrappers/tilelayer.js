'use strict';

var L = require('../vendor/leaflet.js')
var assert = require('assert')
require('../vendor/leaflet-plugins-google')

/**
 * Returns the value along a certain path of nested object properties.
 * 
 * @param  Object root Base object to traverse (e.g. window)
 * @param  String path Dot delimited path of object properties
 * @return Object
 */
var objFromPath = function(root, path) {
	var obj = root, parts = path.split('.');
	for (var i = 0; i < parts.length; i++) {
		obj = obj[parts[i]];
	}
	return obj;
}

/**
 * Intermediary tile layer used to generate either a Google layer, or a Leaflet tileLayer.
 *
 * @param {string} name
 * @param {object} config
 */
module.exports = function (name, config) {
  var tileLayer = null

  if(config.constructor) {
  	var args = config.arguments, fn = objFromPath(window, config.constructor);
  	assert(typeof(fn), 'function', '"constructor" needs to be a function');
  	tileLayer = fn.call(args);
  } else if(config.type === 'google') {
    tileLayer = new L.Google((config.mapType ? config.mapType : 'ROADMAP'))
  } else {
    tileLayer = L.tileLayer(config.url, config)
  }

  return tileLayer
}
