export default {
    methods: {
        goto(o) {
            console.log('路由跳转');
            this.$router.push(o);
        },
    },
};
