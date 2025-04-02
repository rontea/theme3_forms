'use strict';

const {ref , onMounted, nextTick, watch ,computed} = Vue;
import { MessageClass } from './classes/messageClass.js';

 export const dynamicMessageHelper = {
    delimiters: ['[[', ']]'],
    template: '#dynamic-message-helper-template',
    props: {

      inputFields: {
        type: Object,
        required:true,
      }  
    },
    setup(props) {
      
      // Element
      const inputElement = ref(null);
      const inputMessageElement = ref(null);
      const currentCountElement = ref(null);

    
      // input fields
      const messages = ref(props.inputFields.messages);
      let message = ref(props.inputFields.messages.default || 'Default message');
      const inputId = ref(props.inputFields.inputId || 'inputIdNotDefined');
      const inputName = ref(props.inputFields.inputName || 'inputNameNotDefined');
      // input value
      const inputValue = ref(props.inputFields.inputValue || '');
      const inputPlaceholder = ref(props.inputPlaceholder || 'inputPlaceholderNotDefined');
      const labelTitle = ref(props.inputFields.labelTitle || 'labelTitleNotDefined');
      const disabled = ref(props.inputFields.disabled || false);
      const required = ref(props.inputFields.required || false);
      const ariaInvalid = ref(props.inputFields.ariaInvalid || false);
      const autoComplete = ref(props.inputFields.autoComplete || 'off');
      const currentCount = ref(0);
      const maxCount = ref(0);
      const minlength = ref(props.inputFields.minlength || 0);
      const maxlength = ref(props.inputFields.maxlength || 60);
      // classes
      const countWarningClass = ref(props.inputFields.classes.countWarning || 'input__counter--error');
      
      
      

      const disabledClass = ref(props.inputFields.classes.disabled || 'disabled');
      const inputClass = ref(props.inputFields.classes.inputClass || '');

      if(inputValue.value.length > 0){
        console.log('inputValue.value.length',inputValue.value.length);
        currentCount.value = inputValue.value.length;
      }

      onMounted( async () => {

        await nextTick();

        // Check Mounting Elements 
        if(!inputElement.value) {
          console.warn('inputElement ref not found. Skipping setup.');
        }else {
            
          if(inputElement.value.getAttribute('maxlength')){
            console.log('available');
            maxCount.value = inputElement.value.getAttribute('maxlength');
          }

          if(inputElement.value.getAttribute('minlength')){
            minlength.value = inputElement.value.getAttribute('minlength');
          }

        }

        if(!inputMessageElement.value) {
          console.warn('inputMessageElement ref not found. Skipping setup.');
        }

        if(!currentCountElement.value) {
          console.warn('currentCountElement ref not found. Skipping setup.');
        }

        if(inputClass.value !== '') {
          addClass(inputElement.value,inputClass.value);
        }

        if(required.value){
          inputElement.value.setAttribute('required','');
          inputElement.value.setAttribute('aria-required','true');
        }

        if(disabled.value){
          inputElement.value.setAttribute('disabled','');
          addClass(inputElement.value,disabledClass.value);
        }

      });

      // watch for input value changes
      watch(inputValue, (newValue) => {
        currentCount.value = newValue.length; 

        if( currentCount.value  >= maxCount.value){
          console.log('check');
          setErrorClass(inputMessageElement.value,countWarningClass.value);
        }else{
          removeClass(inputMessageElement.value,countWarningClass.value);
        }

        const messageDisplay = new MessageClass(messages.value,minlength.value
          ,currentCount.value,maxCount.value,required.value).validateInputText();

          message.value = messageDisplay.message;
         
          // Class CurrentCount
          currentCountClass(messageDisplay.class);
          
        //console.log('currentCount',currentCount.value);
        //console.log('maxCount',maxCount.value);
        //console.log(countMaxClass.value);
        
      });
   
      const currentCountClass = (className) => {
        console.log(className);
          return className;
      };

      const setErrorClass = (element,className) => {
        element.classList.add(className);
        console.log('element',element);
        console.log('className',className);
      };

      const addClass = (element,className) => {
        element.classList.add(className);
      };

      const removeClass = (element,className) => {
        element.classList.remove(className);
      };

    
      
        return {
           message,
           inputName,
           inputId,
           inputValue,
           inputPlaceholder,
           inputElement,
           inputMessageElement,
           labelTitle,
           required,
           disabled,
           ariaInvalid,
           autoComplete,
           inputClass,
           maxCount,
           currentCount,
           currentCountClass,
           
          };
    },
   
  
  };

