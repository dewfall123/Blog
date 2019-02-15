<style lang="less">
    @import './markdown.less';
</style>

<template>
    <article id="markdown" class="markdown" v-html="html">
    </article>
</template>
<script>
    export default {
        name: 'markdown',
        components: {
        },
        props: {
            html: {
                type: String,
                default: '',
            },
        },
        data() {
            return {
            };
        },
        methods: {
        },
    };
</script>