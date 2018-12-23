<style lang="less">
    @import './index.less';
</style>

<template>
    <div class="app">
        <nav class="navbar-header">
            <div class="nav-left">
                <div class="icon-title">
                    <Icon type="ios-planet-outline" size="38"/>
                    <span class="title" @click="goto({name: 'BlogList'})">Z-blog</span>
                </div>
                <Input class="header-search" 
                    @on-blur="topInputFocus = false" 
                    @on-focus="topInputFocus = true"
                    search placeholder="Enter something..." />
            </div>
            <div class="nav-right">
                <Button shape="circle"  @click="goto({name: 'BlogEdit'})">写Blog</Button>
            </div>
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
    import link from './mixins/link.js';

    export default {
        mixins: [ link ],
        components: {
        },
        data() {
            return {
                logo,
                topInputFocus: false,
            };
        },
        methods: {
        },
    };
</script>