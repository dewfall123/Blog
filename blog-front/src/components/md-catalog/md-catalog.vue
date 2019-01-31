<style lang="less" scoped>
.catalog {
    position: fixed;
    top: 40%;
    margin-left: 682px;
    max-width: 400px;
    transform: translateY(-50%);
    height: 200px;
    > ul {
        border-left: 2px solid #ddd;
        padding: 2px 8px;
        > li {
            cursor: pointer;
            font-size: 12px;
            line-height: 1.5;
            &::before {
                
            }
        }
    }
}
</style>

<template>
    <aside class="catalog">
        <!-- {{catalog}} -->
        <ul>
           <li v-for="li of catalog" :key="li.text">{{li.text}}</li>
        </ul>
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
        // watch: {
        //     markdownId: {
        //         immediate: true,
        //         handler(n, o){
        //             debugger;
        //             console.log(n, o);
        //         },
        //     },
        // },
        computed: {
            catalog() {
                const $markdown = document.getElementById(this.markdownId);
                if (!$markdown) {
                    return [];
                }
                const nodeList = $markdown.querySelectorAll(this.selectors.join());
                console.log(nodeList);
                const tree = [];
                // 生成tree
                for (const node of nodeList) {
                    const li = {
                        text: node.innerText,
                        tag: node.tagName,
                    };
                    tree.push(li);
                }
                return tree;
            },
        },
        methods: {
        },
    };
</script>