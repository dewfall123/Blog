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
        padding: 0px 8px;
        > li {
            cursor: pointer;
            font-size: 12px;
            line-height: 1.8;
         
            &.big {
                font-size: 14px;
                color: #333;
                padding-left: 8px;
            }   
            &.small {
                color: #666;
                padding-left: 24px;
                line-height: 1.7;
            }
            &.li-active {
                color: #f44336;
                position: relative;
                &::before {
                    content: '';
                    display: inline-block;
                    position: absolute;
                    left: -13px;
                    top: 50%;
                    transform: translate(0, -50%);
                    background-color: #f44336;
                    width: 8px;
                    height: 8px;
                    border-radius: 8px;
                }
            }
            &:hover {
                color: #f44336;
            }
        }
    }
}
</style>

<template>
    <aside class="catalog">
        <!-- {{catalog}} -->
        <ul id="lis">
           <li v-for="(li, index) of catalog" :key="li.text" 
                @click="scrollTo(index)"
                :class="[`${(li.tag < splitTag ? 'big' : 'small')}`, index === activeIndex ? 'li-active' : '']">
                {{li.text}}
            </li>
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
            splitTag: {
                default: 'h4',
                type: [ String ],
            },
            selectors: {
                default: () => { return [ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6' ]; },
                type: [ Array ],
            },
        },
        data() {
            return {
                activeIndex: 0,
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
            // 目标tag
            nodeList() {
                const $markdown = document.getElementById(this.markdownId);
                if (!$markdown) {
                    return [];
                }
                const nodeList = $markdown.querySelectorAll(this.selectors.join());
                return nodeList;
            },
            catalog() {
                const tree = [];
                // 生成tree
                for (const node of this.nodeList) {
                    const li = {
                        text: node.innerText,
                        tag: node.tagName.toLowerCase(),
                    };
                    tree.push(li);
                }
                return tree;
            },
        },
        methods: {
            scrollTo(index) {
                const target = this.nodeList[index];
                // target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                window.scrollTo({
                    top: target.offsetTop - 80 - 20,
                    behavior: 'smooth',
                });
            },
            // 滚动事件
            handlerScroll() {
                // TODO 减少触发次数
                for (let i = 0; i < this.nodeList.length; i++) {
                    const node = this.nodeList[i];
                    const pageScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                    if (node.offsetTop - pageScrollTop > 80) { // 大于顶部遮拦表示在可视范围
                        this.activeIndex = i;
                        break;
                    }
                }
            },
        },
        mounted() {
            this.handlerScroll();
            window.addEventListener('scroll', this.handlerScroll);
        },
    };
</script>