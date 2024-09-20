'use strict';

/**
 * Helper in getting attributes when use the ifEquals
 * @param {*} id 
 * @param {*} inputs 
 * @returns attributes
 */

module.exports = function(id, inputs) {

    let results = "";
   
    for (let key in inputs) {
        
        if (key === 'inputs' && Array.isArray(inputs[key])){
            
            inputs[key].forEach((input, index) => {        
                // Display each key-value pair for the input item
                if(input.id === id){
                    for (let inputKey in input) {
                        results += ` ${inputKey}="${input[inputKey]}" `;
                    }
                    
                }

            });
        }
    }
    return results;
};