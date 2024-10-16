'use strict';

/**
 * Check if two values are equal and execute a function based on the result.
 * @param {string|number|boolean} a - The value to compare
 * @param {string|number|boolean} b - The value to compare with
 * @param {Object} options - Handlebars options object
 */
module.exports = function(a, b, options) {
  if (a === b) {
    return options.fn(this);
  } 
};