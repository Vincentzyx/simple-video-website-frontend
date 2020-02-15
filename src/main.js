import Vue from 'vue';
import VueRouter from 'vue-router';
import { Notification, Icon } from 'element-ui';
import axios from 'axios';
import VueAxios from 'vue-axios';
import md5 from 'js-md5';
import App from './App.vue';
import config from "@/config.js";

Vue.use(VueAxios, axios);
Vue.use(VueRouter);
Vue.use(Icon);

Vue.prototype.config = config;
Vue.prototype.$md5 = md5;
Vue.prototype.$notify = Notification;

Vue.config.productionTip = false;

axios.defaults.withCredentials = true;
axios.defaults.baseURL = config.serverUrl;

Vue.prototype.sleep = function(time) {
    var startTime = new Date().getTime() + parseInt(time, 10);
    while(new Date().getTime() < startTime) {}
};

// new Vue({
//   render: h => h(App),
// }).$mount('#app');

const routes = [
    {
        path: "/",
        component: ()=>import(/* webpackChunkName: "index" */"@/VideoList.vue")
    },
    {
        path: "/v/:vid",
        component: ()=>import(/* webpackChunkName: "video-view" */"@/VideoView.vue")
    },
    {
        path: "/user/:uid",
        component: ()=>import(/* webpackChunkName: "user-page" */"@/UserPage.vue")
    },
    {
        path: "/login",
        component: ()=>import(/* webpackChunkName: "login" */"@/Login.vue")
    },
    {
        path: "/register",
        component: ()=>import(/* webpackChunkName: "register" */"@/Register.vue")
    },
    {
        path: "/404",
        component: ()=>import(/* webpackChunkName: "404" */"@/404.vue")
    }
]

const router = new VueRouter({
    routes
})

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');

