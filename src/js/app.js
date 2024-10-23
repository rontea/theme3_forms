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




document.querySelectorAll('.text-counter').forEach((element, index) => { 
  const uniqueId = `#text-counter-${index + 1}`;
  console.log(uniqueId);

  
const textCounter = createApp({

    delimiters: ['[[', ']]'],
    data() {
      return {
      userInput: '',
      charCount: 0,
      maxCount: 0
      };
    },
    mounted() {
      const inputElement = this.$refs.inputElement;
      const value = inputElement.getAttribute('value');
      const maxLength = inputElement.getAttribute('maxlength');
      this.maxCount = maxLength;
      this.userInput = value;
    },
    watch: {
    userInput() {
      this.countChecker();
    }
    },
    methods: {
      countChecker(){

        const inputElement = this.$refs.inputElement;
        const helperElement = this.$refs.helperElement;
        const helperRequired = this.$refs.helperRequired;

        const minLength = inputElement.getAttribute('minlength');
        const maxLength = inputElement.getAttribute('maxlength');
        let value = this.userInput;
      
        this.charCount = value.length;
        this.maxCount = maxLength;

        if (value.length < minLength) {
          helperElement.classList.add('input__counter--error');
          console.log('input is too short');
        }else {
          helperElement.classList.remove('input__counter--error');
        } 

        if (value.length === minLength) {
          helperElement.classList.remove('input__counter--error');
        }

        if(value.length === 0 || value.length < minLength) {
          helperRequired.classList.add('input__counter--error');
        }else {
          helperRequired.classList.remove('input__counter--error');
        }

      }
    }
  });

  textCounter.mount(uniqueId);
  
});