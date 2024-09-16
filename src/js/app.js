'use strict';

// Import the necessary Vue functions
const { createApp } = Vue;

// Define the ExampleComponent
const ExampleComponent = {
  template: '<div><h2>{{ message }}</h2></div>',
  data() {
    return {
      message: 'Hello from Vue 3 component!',
    };
  },
};

// Create the Vue app and mount it to #app
createApp({
  components: {
    ExampleComponent,
  },
}).mount('#app');