"use strict";

/**
 * Return the attributes of an input based on the id and inputs.
 * @function
 * @param {string} id - id of the input.
 * @param {object} inputs - inputs object from the json file.
 * @returns {string} attributes of the input.
 */
module.exports = function (id, inputs) {
  let results = "";

  for (let key in inputs) {
    if (key === "inputs" && Array.isArray(inputs[key])) {
      inputs[key].forEach((input, index) => {
        // Display each key-value pair for the input item
        if (input.id === id) {
          for (let inputKey in input) {
            results += ` ${inputKey}="${input[inputKey]}" `;
          }
        }
      });
    }
  }
  return results;
};
