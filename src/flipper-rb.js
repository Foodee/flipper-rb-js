'use strict';

/**
 * A wrapper around
 */
class Flipper {

  /**
   * @param {Object} features
   */
  constructor(features) {
    this._features = features;
  }

  /**
   * Disable a named feature, used for testing mostly
   *
   * @param {string} featureName
   */
  disableFeature(featureName) {
    this.set(featureName, false);
  }

  /**
   * Enable a named feature, used for testing mostly
   *
   * @param {string} featureName
   */
  enableFeature(featureName) {
    this.set(featureName, true);
  }

  /**
   *  Whether or not a named feature is enabled
   *
   * @param {string} featureName
   * @returns {boolean}
   */
  isEnabled(featureName) {
    return !!this.get(featureName);
  }

  /**
   *  Execute the provided callback
   *
   * @param {string} featureName
   * @param {function} func
   */
  ifEnabled(featureName, func) {
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
  get(featureName) {
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
  set(featureName, value) {
    this._features[featureName] = value;

    return this;
  }

  /**
   * @param {string} url endpoint
   * @param {object} options

   * @returns {Promise.<Flipper>} promise of the initialized flipper
   */
  static load(url, {headers = {}, PromiseClass = Promise} = {}) {
    return new PromiseClass((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);

      Object
        .keys(headers)
        .forEach(key => xhr.setRequestHeader(key, headers[key]));

      xhr.onload = function (e) {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {

            let result;

            try {
              result = JSON.parse(xhr.responseText);
            }
            catch (e) {
              reject(`Expected a JSON response from ${url}`);
            }

            resolve(new Flipper(result));
          } else {
            reject(xhr.statusText);
          }
        }
      };


      xhr.onreadystatechange = function (e) {
        if (xhr.status >= 400) {
          reject(xhr.statusText)
        }
      };

      xhr.ontimeout = function (e) {
        reject(xhr.statusText);
      };

      xhr.send(null);
    });
  }
}

module.exports = Flipper;
