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
                    <!-- <Input class="header-search" 
                        @on-blur="topInputFocus = false" 
                        @on-focus="topInputFocus = true"
                        prefix="ios-search" placeholder="Enter something..." /> -->
                </div>
                <div class="nav-right">
                    <!-- <span class="username">{{username}}</span> -->
                    <span  @click="testLogin">写Blog</span>
                </div>
            </div>
        </header>
        <!-- 轮播图 -->
        <Carousel class="carousel" loop :autoplay="true"
            :autoplay-speed="6000"
            v-show="$route.name === 'BlogList'">
            <CarouselItem>
                <img v-lazyload="top1" :src="top1" />
            </CarouselItem>
            <CarouselItem>
                <img v-lazyload="top2" :src="top2" />
            </CarouselItem>
            <CarouselItem>
                <img v-lazyload="top3" :src="top3" />
            </CarouselItem>
        </Carousel>
        <main class="container">
            <router-view></router-view>
            <BackTop :height="100"></BackTop>
            <Modal
                v-model="loginShow"
                title="登录"
                @on-ok="login"
                >
                <Input type="password" v-model="password"></Input>
            </Modal>
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
    import top1 from '../assets/images/top1.png';
    import top2 from '../assets/images/top2.png';
    import top3 from '../assets/images/top3.png';
    import img1_small from '../assets/images/chuanzhang4-1small.png';
    import link from './mixins/link.js';

    export default {
        mixins: [ link ],
        components: {
        },
        data() {
            return {
                logo,
                top1,
                top2,
                top3,
                img1_small,
                topInputFocus: false,
                loginShow: false,
                password: '',
            };
        },
        methods: {
            async testLogin() {
                const res = await this.ajax.get('/api/testlogin');
                if (res.data.login) {
                    this.goto({ name: 'BlogEdit' });
                } else {
                    this.loginShow = true;
                }
            },
            async login() {
                const res = await this.ajax.get('/api/login', {
                    params: { password: this.password },
                });
                if (res.data.result === 0) {
                    this.loginShow = false;
                    this.goto({ name: 'BlogEdit' });
                }
            },
        },
        mounted() {
        },
    };
</script>