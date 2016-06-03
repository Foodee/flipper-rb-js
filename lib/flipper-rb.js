module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * A wrapper around
	 */

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Flipper = function () {

	  /**
	   * @param {Object} features
	   */

	  function Flipper(features) {
	    _classCallCheck(this, Flipper);

	    this._features = features;
	  }

	  /**
	   * Disable a named feature, used for testing mostly
	   *
	   * @param {string} featureName
	   */


	  _createClass(Flipper, [{
	    key: "disableFeature",
	    value: function disableFeature(featureName) {
	      this.set(featureName, false);
	    }

	    /**
	     * Enable a named feature, used for testing mostly
	     *
	     * @param {string} featureName
	     */

	  }, {
	    key: "enableFeature",
	    value: function enableFeature(featureName) {
	      this.set(featureName, true);
	    }

	    /**
	     *  Whether or not a named feature is enabled
	     *
	     * @param {string} featureName
	     * @returns {boolean}
	     */

	  }, {
	    key: "isEnabled",
	    value: function isEnabled(featureName) {
	      return !!this.get(featureName);
	    }

	    /**
	     *  Execute the provided callback
	     *
	     * @param {string} featureName
	     * @param {function} func
	     */

	  }, {
	    key: "ifEnabled",
	    value: function ifEnabled(featureName, func) {
	      this.isEnabled(featureName) && func();
	    }

	    /**
	     * Accessor for a single feature, override if your data structure is more complex
	     * than:
	     *
	     * {
	     *   featureName: boolean
	     * }
	     *
	     * @param {string} featureName
	     */

	  }, {
	    key: "get",
	    value: function get(featureName) {
	      return this._features[featureName];
	    }

	    /**
	     * Mutator for a single feature, override if your data structure is more complex
	     * than:
	     *
	     * {
	     *   featureName: boolean
	     * }
	     *
	     * @param {string} featureName
	     * @param {boolean} value
	     * @returns {Flipper}
	     */

	  }, {
	    key: "set",
	    value: function set(featureName, value) {
	      this._features[featureName] = value;

	      return this;
	    }

	    /**
	     * @param {string} url endpoint
	     * @param {object} options
	      * @returns {Promise.<Flipper>} promise of the initialized flipper
	     */

	  }], [{
	    key: "load",
	    value: function load(url) {
	      var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	      var _ref$headers = _ref.headers;
	      var headers = _ref$headers === undefined ? {} : _ref$headers;
	      var _ref$PromiseClass = _ref.PromiseClass;
	      var PromiseClass = _ref$PromiseClass === undefined ? Promise : _ref$PromiseClass;

	      return new PromiseClass(function (resolve, reject) {
	        var xhr = new XMLHttpRequest();
	        xhr.open("GET", url, true);

	        Object.keys(headers).forEach(function (key) {
	          return xhr.setRequestHeader(key, headers[key]);
	        });

	        xhr.onload = function (e) {
	          if (xhr.readyState === 4) {
	            if (xhr.status === 200) {

	              var result = void 0;

	              try {
	                result = JSON.parse(xhr.responseText);
	              } catch (e) {
	                reject("Expected a JSON response from " + url);
	              }

	              resolve(new Flipper(result));
	            } else {
	              reject(xhr.statusText);
	            }
	          }
	        };

	        xhr.onreadystatechange = function (e) {
	          if (xhr.status >= 400) {
	            reject(xhr.statusText);
	          }
	        };

	        xhr.ontimeout = function (e) {
	          reject(xhr.statusText);
	        };

	        xhr.send(null);
	      });
	    }
	  }]);

	  return Flipper;
	}();

	module.exports = Flipper;

/***/ }
/******/ ]);