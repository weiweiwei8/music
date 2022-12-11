import Vue from 'vue'
import App from './App'
import request from './utils/request.js'
import moment from './common/moment.js'
Vue.prototype.request=request;
Vue.prototype.moment=moment;
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
