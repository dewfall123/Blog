import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';
// import Vuex from 'vuex';
import Util from './libs/util';
import mavonEditor from 'mavon-editor';
import Lazyload from 'vue-lazyload-img';

import 'iview/dist/styles/iview.css';
import 'mavon-editor/dist/css/index.css';

import App from './app.vue';

Vue.use(VueRouter);
// Vue.use(Vuex);
Vue.use(iView);
Vue.use(mavonEditor);
Vue.use(Lazyload, {
    time: 300,
    fade: true,
    speed: 0,
    // px
    preload: 500,
});

// 自定义的方法
Vue.use(Util);


// 路由配置
const RouterConfig = {
    // mode: 'history',
    routes: Routers,
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.util.title(to.meta.title);
    next();
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});



new Vue({
    el: '#app',
    router,
    // store,
    components: {
    },
    render: h => h(App),
});
