// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';
// import VeeValidate from 'vee-validate';
// import zhTWValidate from 'vee-validate/dist/locale/zh_TW';
import VeeValidate, { Validator } from 'vee-validate'   //匯入檔案
import TW from 'vee-validate/dist/locale/zh_TW'    //匯入語言包
// import VueI18n from 'vue-i18n';Vue.use(VueI18n);

import App from './App';
import router from './router';
import './bus';
import currencyFilter from './filters/currency';
import dateFilter from './filters/date';

Vue.use(VueAxios, axios);
// VeeValidate.Validator.localize('zh_TW', zhTWValidate);
Vue.use(VeeValidate);
Validator.localize('zh-TW', TW)

// const i18n = new VueI18n({
//   locale: 'zhTW'
// });

// Vue.use(VeeValidate, {
//   i18n,
//   dictionary: {
//     zhTW
//   }
// });



Vue.component('Loading',Loading);
Vue.filter('currency',currencyFilter);
Vue.filter('date', dateFilter);



/**因為 axios 預設是發送請求的時候不會帶上 cookie 的，需要通過設置 withCredentials: true */
axios.defaults.withCredentials = true; 

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  // i18n,
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

router.beforeEach((to,from,next)=>{
  console.log('to',to,'from',from,'next',next);

  if(to.meta.requiresAuth){
    // console.log("這裡需要驗證");
    const api=`${process.env.APIPATH}/api/user/check`;
            const vm=this;
            // this.$http
            axios.post(api).then((response)=>{
                console.log(response.data);
                if(response.data.success){
                   next();
                }else{
                  next({
                    path:'/login',
                  })
                }
            });
  }else{
    next();
  }
  
});
