export class MessageClass {
    constructor(messages =  {}, minlength, count, maxCount, required, debug = false) {
        this.messageDefault = messages.default ||'Default message';
        this.messageWarning = messages.warning || 'Message Warning';
        this.messageError = messages.error || 'Message Error';
        this.messageSuccess = messages.success ||'Message Success';
        this.messageCountError = messages.errorCount || 'Message Error Count';
        this.messageErrorRequired = messages.errorRequired || 'Message Required';
        this.count = count || 0;
        this.maxCount = maxCount || 60;
        this.minlength = minlength || 0;
        this.required = required || false;
        
        if(debug){
            console.log(messages.default);
            console.log(messages.warning);
            console.log(messages.error);
            console.log(messages.success);
            console.log(messages.errorCount);
            console.log(minlength);
            console.log(count);
            console.log(maxCount);
        }

        
    }

    validateInputText() {
        
         const message = {};

         if(this.count >= this.maxCount){
           message.message = this.messageWarning;
           message.class = 'input__counter--error';
           
         }else if(this.count === 0 && this.required){
           message.message = this.messageErrorRequired;
           message.class = 'input__counter--error';
         }else if(this.count < this.minlength){
           message.message = this.messageCountError;
            message.class = 'input__counter--error';
         }else {
            message.message = this.messageDefault;
            message.class = '';
        }
         console.log('message:',message);    
          return message;
    }
}