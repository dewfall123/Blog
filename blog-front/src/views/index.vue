<style lang="less">
    @import './index.less';
</style>

<template>
    <div class="body">
        <canvas class="background-canvas"></canvas>
        <nav class="navbar-header">
            <Avatar :src="logo" size="large" />
            <span class="title" @click="goto('bloglist')">首页</span>
            <Input class="header-search" 
                @on-blur="topInputFocus = false" 
                @on-focus="topInputFocus = true"
                search placeholder="Enter something..." />
            <Button shape="circle"  @click="goto('blogedit')">写Blog</Button>
        </nav>
        <main class="container">
            <router-view></router-view>
            <BackTop :height="100"></BackTop>
        </main>
        <footer></footer>
    </div>
</template>
<script>
    import logo from '../assets/images/title.png';
    import '../assets/js/star.js';

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