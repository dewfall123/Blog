<style lang="less" scoped>
.catalog {
    position: fixed;
    top: 40%;
    margin-left: 682px;
    max-width: 400;
    transform: translateY(-50%);
    height: 200px;
    background: #bdb9b9;
}
</style>

<template>
    <aside class="catalog">
        {{catalog}}
    </aside>
</template>

<script>
    export default {
        name: 'CataLog',
        components: {
        },
        directives: {
        },
        props: {
            markdownId: {
                default: '',
                type: [ String ],
            },
            selectors: {
                default: () => { return [ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6' ] },
                type: [ Array ],
            },
        },
        data() {
            return {
            };
        },
        computed: {
            catalog() {
                const $markdown = document.getElementById(this.markdownId);
                if (!$markdown) {
                    return {};
                }
                const nodeList = $markdown.querySelectorAll(this.selectors.join());
                console.log(nodeList);
                // 生成tree
                for (const selector of this.selectors) {
                    
                }
                return 123;
            },
        },
        methods: {
        },
    };
</script>