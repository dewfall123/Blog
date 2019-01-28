<style lang="less" scoped>
    .arr-input-container {
        width: 100%;
        min-height: 32px;
        padding: 2px 4px;
        border: 1px solid #dcdee2;
        border-radius: 4px;
        cursor: pointer;
        .arr-input-input {
            display: inline-block;
            width: 140px;
            vertical-align: center;
            height: 22px;
            line-height: 22px;
            margin: 2px 4px 2px 0;
            padding: 0 8px;
            border: 1px solid #e9eaec;
            border-radius: 3px;
            font-size: 12px;
            overflow: hidden;
        }
    }
</style>

<template>
    <div :class="['arr-input-container', ...containerClassArr]" 
        v-click-outside="handlerClickOutside"
        @click="handlerClick">
        <Tag :class="['', ...tagClassArr]" v-for="(item, index) in value"
            closable :key="index" @on-close="removeItem(index)"
        >
            {{item}}
        </Tag>
        <input v-model="inputText" v-show="addInputShow"
            :class="['arr-input-input', ...inputClassArr]"
            :placeholder="placeholder" @keyup.enter="addItem" @blur="addItem"
            v-focus="addInputShow"
        >
        </input>
    </div>
</template>

<script>
    import { Tag } from 'iview';
    import vClickOutside from 'v-click-outside';
    export default {
        name: 'ArrInput',
        components: {
            Tag,
            vClickOutside,
        },
        directives: {
            focus: {
                update(el, { value }) {
                    if (value) {
                        el.focus();
                    }
                },
            },
            clickOutside: vClickOutside.directive,
        },
        props: {
            value: {
                default: () => { return []; },
                type: [ Array ],
            },
            placeholder: {
                default: '请填写..',
                type: [ String ],
            },
            pruneFunction: {
                default: i => { return i; },
                type: Function,
            },
            containerClassArr: {
                default: () => { return []; },
                type: [ Array ],
            },
            tagClassArr: {
                default: () => { return []; },
                type: [ Array ],
            },
            inputClassArr: {
                default: () => { return []; },
                type: [ Array ],
            },
        },
        data() {
            return {
                inputText: '',
                addInputShow: false,
            };
        },
        computed: {
        },
        methods: {
            handlerClick() {
                this.addInputShow = true;
            },
            handlerClickOutside() {
                this.addInputShow = false;
            },
            removeItem(index) {
                const copyArr = [ ...this.value ];
                copyArr.splice(index, 1);
                this.$emit('input', copyArr);
            },
            addItem() {
                if (this.inputText.trim()) {
                    const copyArr = [ ...this.value ];
                    copyArr.push(this.pruneFunction(this.inputText.trim()));
                    this.inputText = '';
                    this.$emit('input', copyArr);
                }
            },
        },
    };
</script>