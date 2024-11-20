
const {createApp , ref} = Vue;

import { dynamicMessageHelper } from "./dynamicMessageHelper.js"; 


export const dynamicInputComponent = {
  delimiters: ['[[', ']]'], // Use custom delimiters for Vue
  components: {
    dynamicMessageHelper,
  },
  setup() {

    const inputs = ref([]);
    const message = ref('This is a reactive message');
    const inputName = ref('inputName');

     // Add new dynamic input
     const addInput = () => {
      const newId = `helper-message-${inputs.value.length + 1}`;
      inputs.value.push({ id: newId }); // Track dynamically added inputs
      mountHelper(newId); // Dynamically mount the helper component
    };

    // Function to dynamically mount a helper
    const mountHelper = (id) => {
      // Create a container for the dynamic component
      const container = document.createElement('div');
      container.id = id;
      document.body.appendChild(container); // Append to DOM (can be any parent)

      // Dynamically mount the child component
      const app = createApp(dynamicMessageHelper);
      app.mount(`#${id}`);
    };

    return { inputs, addInput, message, inputName };

  },
 
};