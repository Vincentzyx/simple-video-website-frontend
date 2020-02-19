import Vue from 'vue';
import VueRouter from 'vue-router';
import { Notification, Icon, MessageBox, Message } from 'element-ui';
import axios from 'axios';
import VueAxios from 'vue-axios';
import md5 from 'js-md5';
import App from './App.vue';
import config from "@/config.js";
import uploader from 'vue-simple-uploader';

Vue.use(VueAxios, axios);
Vue.use(VueRouter);
Vue.use(Icon);
Vue.use(uploader);

Vue.prototype.config = config;
Vue.prototype.$md5 = md5;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

Vue.config.productionTip = false;

axios.defaults.withCredentials = true;
axios.defaults.baseURL = config.serverUrl;


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
        path: "/upload-video",
        component: ()=>import(/* webpackChunkName: "upload-video" */"@/UploadVideo.vue")
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

