'use strict';

const {ref , onMounted} = Vue;

 export const dynamicMessageHelper = {
    delimiters: ['[[', ']]'],
    setup(_, { emit }) {
      
      const inputElement = ref(null);

      const message = ref('This is a reactive message');
      const inputName = ref('inputName');
      const inputId = ref('inputId');
      const inputValue = ref('');
      const inputPlaceholder = ref(inputId);
      const labelTitle = ref('lableTitle');

      onMounted(() => {
        if (inputElement.value) {
          const checksValue = inputElement.value.getAttribute("checks");
          if (checksValue) {  
            console.log(checksValue);
          }
        }else{
          console.warn('inputElement ref not found. Skipping setup.');
        }
      });
      
  
       
        return {
           message,
           inputName,
           inputId,
           inputValue,
           inputPlaceholder,
           inputElement,
           labelTitle,
           
        
          };
    },
   
  
  };

