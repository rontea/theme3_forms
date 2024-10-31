
export const message = { 

    delimiters: ['[[', ']]'],
    data() {
        return {
            message: '',
        };
    },
    mounted() {
        const helper = this.$refs.helperRequired;
        const helperMessage = helper.getAttribute('message');
        this.message = helperMessage || 'default message';
    },
};


