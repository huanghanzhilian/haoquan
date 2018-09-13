import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/router'
import axios from 'axios'
//import xhrOverwrite from 'xhr-overwrite';
import util from './util'
import store from './store/'
import { routerMode } from './config/env'
import Bus from './bus.js'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import { getUserInfo ,getNoticeListsss} from './service/getData'
import './config/rem'
import FastClick from 'fastclick'
import 'src/style/fontsr.css'


if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false);
}

Bus(Vue)
Vue.use(util);
Vue.use(VueRouter)
Vue.use(MintUI)


const router = new VueRouter({
  routes,
  mode: routerMode,
  strict: process.env.NODE_ENV !== 'production',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop;
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  }
});

router.beforeEach((to, from, next) => {
  store.commit('SET_LOADING', true);
  if(location.hostname!='localhost'){
    console.log('执行埋点')
    console.log(from.name)
    console.log(to.fullPath)
    //统计
    try {　　 // 此处是可能产生例外的语句
      if (_hmt) {
        if (from.name) {
          _hmt.push(['_trackPageview', to.fullPath, window.location.origin]);
        } else {
          _hmt.push(['_trackPageview', to.fullPath]);
        }
      }
    } catch (error) {　　 // 此处是负责例外处理的语句
      //next();　　
    } finally {　　 // 此处是出口语句
      //next();　　
    }
  };

  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})







new Vue({
  router,
  store,
}).$mount('#app')
