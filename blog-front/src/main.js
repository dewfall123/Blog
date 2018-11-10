import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';
import Vuex from 'vuex';
import Util from './libs/util';
import mavonEditor from 'mavon-editor';

import 'iview/dist/styles/iview.css';
import 'mavon-editor/dist/css/index.css'

import App from './app.vue';
import util from './libs/util';

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(iView);
Vue.use(mavonEditor);

Vue.use(Util);


// 路由配置
const RouterConfig = {
    // mode: 'history',
    routes: Routers
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


const store = new Vuex.Store({
    state: {

    },
    getters: {

    },
    mutations: {

    },
    actions: {

    }
});


new Vue({
    el: '#app',
    router: router,
    store: store,
    components: {
    },
    render: h => h(App)
});