'use strict';


const {ref , onMounted, nextTick} = Vue;

 export const dynamicMessageHelper = {
    delimiters: ['[[', ']]'],
    template: '#dynamic-message-helper-template',
    props: {
      inputId: {
      type: String,
      required:true,
      },
      name: {
        type: String,
        required:true,
      }
    },
    setup(props) {
      
      const inputElement = ref(null);

      const message = ref('This is a reactive message');
      const inputId = ref(props.inputId);
      const inputName = ref(props.name);
      const inputValue = ref('');
      const inputPlaceholder = ref(props.name);
      const labelTitle = ref('lableTitle');

      console.log(inputName.value);
      console.log(inputId.value);

      onMounted( async () => {

        await nextTick();
        if(inputElement.value) {
          console.log(inputElement.value);
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

