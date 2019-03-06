// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App.vue';
import router from './router';
// import storage from './vuex/store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import $ from '../build/jquery-vendor';
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import "./assets/icon/depart/iconfont.css";

// require("./common/locwin");

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(Viewer);
Viewer.setDefaults({
  Options: { "inline": true, "button": true, "navbar": true, "title": true, "toolbar": true, "tooltip": true, "movable": true, "zoomable": true, "rotatable": true, "scalable": true, "transition": true, "fullscreen": true, "keyboard": true, "url": "data-source" }
});

new Vue({
  el: '#app',
  router,
  // storage,
  components: { App },
  template: '<App/>',
  render: h => h(App)
});


