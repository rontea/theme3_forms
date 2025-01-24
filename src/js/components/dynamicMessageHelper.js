'use strict';




const {ref , onMounted, nextTick, watch} = Vue;

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
      // input value
      const inputValue = ref(props.inputFields.inputValue || '');
      const inputPlaceholder = ref(props.inputPlaceholder || 'inputPlaceholderNotDefined');
      const labelTitle = ref(props.inputFields.labelTitle || 'labelTitleNotDefined');
      const disabled = ref(props.inputFields.disabled || false);
      const required = ref(props.inputFields.required || false);
      const ariaInvalid = ref(props.inputFields.ariaInvalid || false);
      const autoComplete = ref(props.inputFields.autoComplete || 'off');
      let currentCount = ref(props.inputFields.currentCount || 0);
      let maxCount = ref(props.inputFields.maxCount ||  0);
      
      //classess

      const disabledClass = ref(props.inputFields.classes.disabled || 'disabled');
      const inputClass = ref(props.inputFields.classes.inputClass || '');

      if(inputValue.value.length > 0){
        console.log('inputValue.value.length',inputValue.value.length);
        currentCount = inputValue.value.length;
      }

    
      
      let count = 0;
      onMounted( async () => {

        await nextTick();

        if(!inputElement.value) {
          console.warn('inputElement ref not found. Skipping setup.');
        }else {
            
          if(inputElement.value.getAttribute('maxlength')){
            console.log('available');
            maxCount.value = inputElement.value.getAttribute('maxlength');
          }

          if(inputElement.value.getAttribute('minlength')){
            currentCount.value = inputElement.value.getAttribute('minlength');
          }

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

      watch(inputValue, (newValue) => {
        count = newValue.length;   
        console.log(count);
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
           maxCount,
           currentCount,
           
          };
    },
   
  
  };

