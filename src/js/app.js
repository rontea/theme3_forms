'use strict';

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


const messageHelper = {

  delimiters: ['[[', ']]'],

    data() {
      return {
      userInput: '',
      charCount: 0,
      maxCount: 0,
      message: 'Helper default message',
      checks:[],
      };
    },
  
    mounted() {

      console.log('mounted');
      if(this.$refs.inputElement) {
        const inputElement = this.$refs.inputElement;
        this.maxCount = inputElement.getAttribute('maxlength') || 0;

        if(inputElement.getAttribute('check')) {
          console.log('class');
          const checkAttribute = inputElement.getAttribute('check');
          this.checks = checkAttribute.replace(/[\[\]']+/g, '').split(',');
          console.log(this.checks);
        }

        if(inputElement.getAttribute('value')){
          this.userInput= inputElement.getAttribute('value');
          this.charCount = this.userInput.length;
        }
       
        
      }else{
        throw new Error('inputElement not found');
      }

      if(this.$refs.helperElement) {
        const helper = this.$refs.helperElement;
        this.message = helper.getAttribute('message') || 'missing message';
        console.log("Message : " , this.message);
      }else{
        throw new Error('helperElement not found');
      }
     
    },
    watch: {
      
      userInput() {
        
        if(this.checks.includes('counter')){
          this.countChecker();
        }

        if(this.checks.includes('pattern')){
          this.checkPattern();
        }
      
              
      }
    },
    methods: {
      
      countChecker(){

        console.log('check counter');

        if(this.$refs.inputElement && this.$refs.helperElement) {
          const inputElement = this.$refs.inputElement;
          const helperElement = this.$refs.helperElement;

          const minLength = inputElement.getAttribute('minlength') || 0;
          let value = this.userInput;
          this.charCount = value.length;

          if (value.length < minLength) {
            helperElement.classList.add('input__counter--error');
             
            //console.log('input is too short');
          }else {
            helperElement.classList.remove('input__counter--error');
          
            //console.log('valid input');
          }
          
          if(this.checks.includes('watchcounter')){
            if(this.$refs.helperCounter) {
              const helperCounter = this.$refs.helperCounter;
  
              if(value.length === 0 || value.length < minLength) {
                helperCounter.classList.add('input__counter--error');
              }else {
                helperCounter.classList.remove('input__counter--error');
              }
            }
          }
      
  
        }else {
          throw new Error('inputElement not found');
        }

      },

      checkPattern(){
        
        console.log('check pattern');

        if(this.$refs.inputElement){

          const inputElement = this.$refs.inputElement;

            if(inputElement.getAttribute('pattern')){

              if(!this.$refs.helperElement) {
                throw new Error('helperElement not found');
              }
              const pattern = inputElement.getAttribute('pattern');
              const regex = new RegExp(pattern);
              const isPatternValid = regex.test(this.userInput, 'u');
              const helperElement = this.$refs.helperElement;

              if(!isPatternValid){
                helperElement.classList.add('input__counter--error');
                
                if(this.userInput.length === 0) {
                  this.message = 'You Entered empty value';
                }else{  
                  this.message = 'You Entered an invalid input';
                }

              }else{
                helperElement.classList.remove('input__counter--error');
                this.message = helperElement.getAttribute('message');
              }

            }else{
              console.log('no pattern is define on ref inputElement');
            }
          

        }else { 
          throw new Error('inputElement not found');
        }

      }
    }
  };

document.querySelectorAll('.helper-message').forEach(element => { 
  const uniqueId = `#${element.id}`;
  console.log(uniqueId);
  createApp(messageHelper).mount(uniqueId);
  console.log('======');
});