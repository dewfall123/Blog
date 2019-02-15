<style lang="less">
.tag-line {
    display: inline-block;
    width: 100%;
    height: 20px;
    .footer-icons{
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
        > div:nth-child(1) {
            > i {
                vertical-align: -2px;
            }
        }
        > div:nth-child(2) {
            > i {
                vertical-align: -3px;
            }
        }
    }
}
</style>

<template>
    <div class="tag-line" >
        <div class="footer-icons">
            <div>
                <Icon type="md-calendar" :size="16" />
                <span>{{dayjs(+blogI.createTime).format('YYYY-MM-DD')}}</span>
            </div>
            <div>
                <Icon type="ios-eye" :size="18"/>
                <span>{{blogI.see || 0}}</span>
            </div>
            <div>
                <Icon type="md-chatboxes" :size="16"/>
                <span>{{blogI.comment || 0}}</span>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'tags',
        components: {
        },
        props: {
            blogI: {
                type: Object,
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