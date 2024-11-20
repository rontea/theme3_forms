'use strict';
import { messageHelper } from './components/messageHelper.js';
import { dynamicInputComponent } from './components/dynamicInputs.js';
import { dynamicMessageHelper } from './components/dynamicMessageHelper.js';  

const { createApp } = Vue;


// Define the ExampleComponent
const ExampleComponent = {
  template: '<div><h2>{{ message }}</h2></div>',
  data() {
    return {
      message: 'Aria, Anya, and Kairi 2',
    };
  },
};

// Create the Vue app and mount it to #app
createApp({
  components: {
    ExampleComponent,
  },
}).mount('#app');


const data = createApp({
  delimiters: ['[[', ']]'],
  data() {
    return {
      name: 'Aria, Anya, and Kairi',
    };
  }
});

// Mount the app to the #data element
data.mount('#sample');

/*
createApp(dynamicInputComponent).mount('#myTestApp'); 
*/

document.querySelectorAll('.helper-message').forEach(element => { 
  const uniqueId = `#${element.id}`;
  console.log(uniqueId);
  createApp(messageHelper).mount(uniqueId);
  console.log('======');
});


createApp(dynamicMessageHelper).mount('#myTestApp'); 


/** Test Dynamic Inputs */

createApp(dynamicInputComponent).mount('#myTestDynamicInputs');