'use strict';

// Import the necessary Vue functions
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

const textCounter = createApp({
  delimiters: ['[[', ']]'],
  data() {
    return {
     userInput: '',
     charCount: 0
    };
  },
  watch: {
   userInput() {
     this.countChecker();
   }
  },
  methods: {
    countChecker(){
      const minLength = this.$refs.inputElement.minlength;
      const maxLength = this.$refs.inputElement.maxlength;
      const value = this.userInput;
      const inputElement = this.$refs.inputElement;
      const helperElement = this.$refs.helperElement;

      this.charCount = value.length;
      console.log(minLength);
      console.log(maxLength);
      console.log(value.length);
      if (value.length < minLength) {
        helperElement.classList.add('input__counter--error');
        console.log('input is too short');
      }

    }
  }
});

textCounter.mount('#text-counter');