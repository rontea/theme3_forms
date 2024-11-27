'use strict';


const {ref , onMounted, nextTick} = Vue;

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
      
      const inputElement = ref(null);

      const message = ref(props.inputFields.message.default || 'Message not defined');
      const inputId = ref(props.inputFields.inputId || 'inputIdNotDefined');
      const inputName = ref(props.inputFields.inputName || 'inputNameNotDefined');
      const inputValue = ref(props.inputFields.value || '');
      const inputPlaceholder = ref(props.inputPlaceholder || 'inputPlaceholderNotDefined');
      const labelTitle = ref(props.inputFields.labelTitle || 'labelTitleNotDefined');
      const disabled = ref(props.inputFields.disabled || false);
      const required = ref(props.inputFields.required || false);
      const ariaInvalid = ref(props.inputFields.ariaInvalid || false);
      const autoComplete = ref(props.inputFields.autoComplete || 'off');
      
      //classess

      const disabledClass = ref(props.inputFields.classes.disabled || 'disabled');
      const inputClass = ref(props.inputFields.classes.inputClass || '');

      onMounted( async () => {

        await nextTick();

        if(!inputElement.value) {
          console.warn('inputElement ref not found. Skipping setup.');
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

      const setErrorClass = (element,className) => {
        element.classList.add(className);
      } 

      const addClass = (element,className) => {
        element.classList.add(className);
      }

      const removeClass = (element,className) => {
        element.classList.remove(className);
      }
      
        return {
           message,
           inputName,
           inputId,
           inputValue,
           inputPlaceholder,
           inputElement,
           labelTitle,
           required,
           disabled,
           ariaInvalid,
           autoComplete,
           inputClass,
          };
    },
   
  
  };

