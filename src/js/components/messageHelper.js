const { nextTick} = Vue;

export const messageHelper = {
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
        nextTick(() => {
        const inputElement = this.$refs.inputElement;

        if (!inputElement) {
          console.error('inputElement ref not found. Skipping setup.');
          return;
        }

        if (inputElement.getAttribute('check')) {
          this.checks = inputElement.getAttribute('check').replace(/[\[\]']+/g, '').split(',');
        }

        if (inputElement.getAttribute('value')) {
          this.userInput = inputElement.getAttribute('value');
          this.charCount = this.userInput.length || 0;
        }

          
        if(this.checks.includes('counter')){
    
            const helperCounter= this.$refs.helperCounter;
          
            if(!helperCounter) {
              console.error('helperCounter ref not found. Skipping setup.');
              return;
            }
    
            if(!inputElement.getAttribute('maxlength')) {
              console.warn('maxlength attribute is missing on input');
            }else {
              this.maxCount = inputElement.getAttribute('maxlength') || 0;
            }
    
           
        }
    
          if(this.checks.includes('pattern')){
    
            if(!inputElement.getAttribute('pattern')){
              inputElement.setAttribute('pattern',"^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s'-]+$");
              inputElement.setAttribute('title',"Must be between 3 and 30 alphabetic characters");
              console.log("Missing Pattern: Autoset pattern to ^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s'-]+$")
            }
          }

          const helper = this.$refs.helperElement;
              
          if(!helper) {
            
            console.error('helperelement ref not found. Skipping setup.');
            return;
              
          }else{
            this.message = helper.getAttribute('message') || 'missing message';
            console.log("Message : " , this.message);
          }
     
        });
       
      },
      watch: {
        
  /**
   * Watcher for userInput
   * 
   * This watcher observes changes to the userInput property. 
   * Whenever the userInput value changes, it triggers the 
   * checkerInput method to validate the input against 
   * specified rules such as minlength and pattern.
   */
        userInput() {
            this.checkerInput();
        }
      },
      methods: {
        
        /**
         * CountChecker
         * 
         * This method checks if the input length is valid according to the minlength attribute.
         * If the input length is shorter than the minlength, it will add an error class to the helper element.
         * If the input length is valid, it will remove the error class from the helper element.
         * If the watchcounter attribute is present, it will also update the counter element with the same class.
         * 
         * @return {void}
         */
        checkerInput(){
  
          const inputElement = this.$refs.inputElement;
          const helperElement = this.$refs.helperElement;
            
          if(this.checks.includes('counter')){
           
            const helperCounter = this.$refs.helperCounter;
            const minLength = inputElement.getAttribute('minlength');
            this.charCount = this.userInput.length;
  
            if(!this.checkMinLength(this.userInput,minLength)){
              this.setErrorCLass(helperElement,'input__counter--error');
  
              if(this.checks.includes('message-counter')){
                this.message = 'Please enter at least ' + minLength + ' characters';
                this.setErrorCLass(helperCounter,'input__counter--error');
              }
  
              inputElement.setAttribute('aria-invalid','true');
            }else{
              this.removeErrorCLass(helperElement,'input__counter--error');
              if(this.checks.includes('message-counter')){
                this.message = helperElement.getAttribute('message');
                this.removeErrorCLass(helperCounter,'input__counter--error');
                if(this.checks.includes('pattern')){
  
                  if(!this.isPatternValid(inputElement)){
                    this.setErrorCLass(helperElement,'input__counter--error');
                    this.message = 'You Entered an invalid input';
                  }else{
                    this.removeErrorCLass(helperElement,'input__counter--error');
                    this.message = helperElement.getAttribute('message');
                  }
                 
                }
              }
              inputElement.setAttribute('aria-invalid','false');
            }
          }else if(this.checks.includes('pattern') && !this.checks.includes('counter')){
            
            if(this.userInput.length !== 0){
              if(!this.isPatternValid(inputElement)){
                this.setErrorCLass(helperElement,'input__counter--error');
                this.message = 'You Entered an invalid input';
                inputElement.setAttribute('aria-invalid','true');
              }else{
                this.removeErrorCLass(helperElement,'input__counter--error');
                this.message = helperElement.getAttribute('message');
                inputElement.setAttribute('aria-invalid','false');
              }
            }else{
              if(inputElement.required){
                if(this.userInput.length === 0){
                  this.setErrorCLass(helperElement,'input__counter--error');
                  this.message = 'This field is required';
                  inputElement.setAttribute('aria-invalid','true');
                }else{
                  this.removeErrorCLass(helperElement,'input__counter--error');
                  this.message = helperElement.getAttribute('message');
                  inputElement.setAttribute('aria-invalid','false');
                }
              }
            }
            
          }else {
            if(inputElement.required){
              if(this.userInput.length === 0){
                this.setErrorCLass(helperElement,'input__counter--error');
                this.message = 'This field is required';
              }else{
                this.removeErrorCLass(helperElement,'input__counter--error');
                this.message = helperElement.getAttribute('message');
              }
            }
          }
            
        },
        /**
         * Check if the user input length is less than min length or empty
         * @param {string} userInput - User input value
         * @param {number} minLength - Minimum length allowed
         * @return {boolean} - True if userInput length is ok, false otherwise
         */
        checkMinLength(userInput,minLength){
          if(userInput.length < minLength || userInput.length === 0){
            return false;
          }else{
            return true;
          }
        },
        /**
         * Add the given className to the element
         * @param {Element} element - The element to add the className
         * @param {string} className - The className to add
         */
  
        setErrorCLass(element,className){
          element.classList.add(className);
          
        },
        /**
         * Remove the given className from the element
         * @param {Element} element - The element to remove the className
         * @param {string} className - The className to remove
         */
  
        removeErrorCLass(element,className){
          element.classList.remove(className);
          
        },
        /**
         * Check if the user input matches the given pattern
         * @param {Element} inputElement - The input element with the pattern attribute
         * @return {boolean} - True if userInput matches the pattern, false otherwise
         */
  
        isPatternValid(inputElement){
          const pattern = inputElement.getAttribute('pattern');
          const regex = new RegExp(pattern);
          const isPatternValid = regex.test(this.userInput, 'u');
          return isPatternValid;
        }
  
      }
    };