<style lang="less">
.icon-block{
    height: 20px;
    margin: 0 20px 0 0;
    cursor: pointer;
    display: flex;
    height: 100%;
    justify-content: flex-start;
    // width: calc(~"100% - 40px");
    color: #888;
    > div {
        margin-right: 18px;
        line-height: 20px;
        > span {
            line-height: 20px;
        }
    }
}
</style>

<template>
    <div class="icon-block" @click="clickEvent">
        <Icon :type="icon" :size="16" />
        <span>{{text}}</span>
    </div>
</template>
<script>
    export default {
        name: 'tags',
        components: {
        },
        props: {
            icon: {
                type: String,
                default: 'logo-nodejs',
            },
            text: {
                type: String,
            },
            clickEvent: {
                type: Function,
                default: () => {},
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