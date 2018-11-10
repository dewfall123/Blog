<style lang="less">
    @import './index.less';
</style>

<template>
    <div class="index">
        <Row class="navbar-header">
            <Col :span="2">
                <Avatar :src="logo" size="large" />
            </Col>
            <Col :span="2">
                <span class="title" @click="goto('bloglist')">首页</span>
            </Col>
            <Col :span="topInputFocus ? 4 : 2">
                <Input class="header-search" 
                    @on-blur="topInputFocus = false" 
                    @on-focus="topInputFocus = true"
                    search placeholder="Enter something..." />
            </Col>
            <Col :span="2" v-show="!topInputFocus"></Col>
            <Col :span="10"></Col>
            <Col :span="4">
                <Button shape="circle"  @click="goto('blogedit')">写Blog</Button>
            </Col>
            <Col :span="2"></Col>
        </Row>
        <Row class="container">
            <router-view></router-view>
            <BackTop :height="100"></BackTop>
        </Row>
    </div>
</template>
<script>
    import logo from '../assets/images/title.png';

    export default {
        data() {
            return {
                logo,
                topInputFocus: false,
            }
        },
        methods: {
            handleStart() {
                this.$Modal.info({
                    title: 'Bravo',
                    content: 'Now, enjoy the convenience of iView.'
                });
            },
            goto(name) {
                this.$router.push({name});
            }
        }
    };
</script>