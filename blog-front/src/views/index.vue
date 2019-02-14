<style lang="less">
    @import './index.less';
</style>

<template>
    <div class="app">
        <header class="navbar-header">
            <div class="container">
                <div class="nav-left">
                    <Icon type="ios-planet-outline" size="38"/>
                    <p class="title" @click="goto({name: 'BlogList'})">Z-blog</p>
                </div>
                <div class="nav-center">
                    <Input class="header-search" 
                        @on-blur="topInputFocus = false" 
                        @on-focus="topInputFocus = true"
                        prefix="ios-search" placeholder="Enter something..." />
                </div>
                <div class="nav-right">
                    <!-- <span class="username">{{username}}</span> -->
                    <Button shape="circle"  @click="goto({name: 'BlogEdit'})">写Blog</Button>
                </div>
            </div>
        </header>
        <img class="top-img" :src="topImg" />
        <main class="container">
            <router-view></router-view>
            <BackTop :height="100"></BackTop>
        </main>
        <footer>
            <a target="_blank">粤ICP备18148812号</a>
            <Divider type="vertical" />
            <a href="https://github.com/dewfall123" target="_blank">Copyright @dewfall123 <Icon type="logo-github"  size="18"/></a>
        </footer>
    </div>
</template>
<script>
    import logo from '../assets/images/title.png';
    import topImg from '../assets/images/chuanzhang.png';
    import link from './mixins/link.js';

    export default {
        mixins: [ link ],
        components: {
        },
        data() {
            return {
                logo,
                topImg,
                topInputFocus: false,
            };
        },
        methods: {
        },
    };
</script>