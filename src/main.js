// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex';
import Axios from 'axios';
import store from './store/store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts'
import * as qiniu from 'qiniu-js'

import Blob from './excel/Blob'
import Export2Excel from './excel/Export2Excel.js'

//引入rem转化
require('rem-init')({
  psd_width: 1920
})

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(Vuex);
Vue.prototype.$axios = Axios;
Vue.prototype.$echarts = echarts
Vue.prototype.$qiniu = qiniu
// Axios.defaults.baseURL = process.env.NODE_ENV === 'development'?'http://tome3pay.zhihuiquanyu.com':'http://47.92.104.251:8080';
// Axios.defaults.baseURL = process.env.NODE_ENV === 'development'?'http://192.168.0.103:8080':'https://tome3pay.zhihuiquanyu.com';
// Axios.defaults.baseURL = process.env.NODE_ENV === 'development'?'http://192.168.0.185:8080':'http://tome3pay.zhihuiquanyu.com';
// Axios.defaults.baseURL = process.env.NODE_ENV === 'development'?'http://192.168.0.181:8080':'http://tome3pay.zhihuiquanyu.com';

Axios.defaults.baseURL = process.env.NODE_ENV === 'development'?'http://192.168.0.107:8080':'http://192.168.0.103:8080';



// 引入组件
import carousel from './components/carousel';//轮播组件
import carousel2 from './components2/carousel2';//轮播组件
import sidebar from './components/sidebar';//侧边栏组件
import sidebar2 from './components/sidebar2';//A2侧边栏组件
import rightContent from './components/rightContent';//右边主体内容
import myTables from './components/myTables'
import mySearchs from './components/mySearchs'
import addEditorForm from './components/addEditorForm'
import editorUserInfoForm from './components/editorUserInfoForm'
import myTablesDialog from './components/myTablesDialog'
import treeviewComponent from './components/treeviewComponent'
import treeviewComponent2 from './components2/treeviewComponent2'
import chooseAreaDialog from './components/chooseAreaDialog'
import chooseSceneryServiceDialog from './components/chooseSceneryServiceDialog'
import chooseOrganizationDialog from './components/chooseOrganizationDialog'
import chooseSceneryDialog from './components/chooseSceneryDialog'
import chooseTourGroupDialog from './components/chooseTourGroupDialog'
//注册组件(全局)
Vue.component('carousel', carousel)
Vue.component('carousel2', carousel2)
Vue.component('sidebar', sidebar)
Vue.component('sidebar2', sidebar2)//A2
Vue.component('rightContent', rightContent)
Vue.component('myTables',myTables)
Vue.component('mySearchs',mySearchs)
Vue.component('addEditorForm',addEditorForm)
Vue.component('editorUserInfoForm',editorUserInfoForm)
Vue.component('myTablesDialog',myTablesDialog)
Vue.component('treeviewComponent',treeviewComponent)
Vue.component('treeviewComponent2',treeviewComponent2)
Vue.component('chooseAreaDialog',chooseAreaDialog)
Vue.component('chooseSceneryServiceDialog',chooseSceneryServiceDialog)
Vue.component('chooseOrganizationDialog',chooseOrganizationDialog)
Vue.component('chooseSceneryDialog',chooseSceneryDialog)
Vue.component('chooseTourGroupDialog',chooseTourGroupDialog)

// 添加请求拦截器，在请求头中加token
Axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('token')) {
      config.headers.Authorization ='Bearer '+localStorage.getItem('token');
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  });



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
