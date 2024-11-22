
const {createApp , ref, onMounted, nextTick} = Vue;

import { dynamicMessageHelper } from "./dynamicMessageHelper.js"; 


const isRefValid = (element,define) => {

    if(!element.value){
      console.warn('element ref not found.', define);
      return false;
    }else{
      return true;
    }
};

export const dynamicInputComponent = {
  delimiters: ['[[', ']]'], // Use custom delimiters for Vue
  components: {
    'dynamic-message-helper-template' :dynamicMessageHelper,  
  },
  setup() {

    const dynamicInputsElement = ref([]);
    const inputElement = ref([]);
    
    const message = ref('This is a reactive message of parent component');
   
    const inputs = ref([]);
    const inputId = ref('');
    const inputName = ref('');
    const labelTitle = ref('lableTitle');
    const inputPlaceholder = ref('inputId'); 
    
    // what happen here is that we need to add the ref on mounted how to do that
     // Add new dynamic input
     const addInput = async() => {
     
      const newId = `helper-message-${inputs.value.length + 1}`;
      const newInputId = `inputId-${inputs.value.length + 1}`;
      const newInputName = `inputName-${inputs.value.length + 1}`;
      inputs.value.push({ id: newId, inputId: newInputId, inputName: newInputName, ref: 'inputElement'}); // Track dynamically added inputs
    
      await nextTick();
      getChecks(dynamicInputsElement);
      await nextTick();
      mountHelper(newId,newInputId,newInputName); // Dynamically mount the helper component
    };

    // Function to dynamically mount a helper
    const mountHelper = async (id,inputId,name) => {

      await nextTick();
      // Dynamically mount the child component
      const app = createApp(dynamicMessageHelper, { inputId , name});
    
      app.mount(`#${id}`);
    };

    
    const getChecks = (element) => {

    
      if (element.value.length === 0) {
        console.warn("No elements found in the ref.");
        return;
      }
     
      element.value.forEach((el,index) => {
        
        if(el) {
          const checks = el.getAttribute("checks");
          console.log(checks);
        }else{
          console.warn(`ref at index: ${index} is not available`);
        }
        
      });
    } 

    onMounted( async () => {
      
    
      await nextTick();
      addInput();
      
      if(!isRefValid(dynamicInputsElement,"dynamicInputsElement")){
        return;
      }

      if(!isRefValid(inputElement,"inputElement")){
        return;
      }

     
    });


    return { inputs, labelTitle, inputPlaceholder, addInput, message, inputName , dynamicInputsElement, inputElement, getChecks };

  },
 
};