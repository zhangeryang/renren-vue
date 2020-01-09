import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css"; 
import echarts from "echarts";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

import setAxios from "./setAxios";


setAxios()

Vue.use(ElementUI);

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.prototype.$echarts = echarts;

new Vue({
  router,
  store,
  render: h => h(App),
  created(){
		store.commit('addMenuRouter',router)
  }
}).$mount("#app");
