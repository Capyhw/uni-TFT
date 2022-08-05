// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import uView from "uni_modules/uview-ui"
Vue.use(uView)
//挂载全局异步请求
import * as _request from "./utils/request.js"
for (let key in _request) {
	Vue.prototype[key] = _request[key]
}








Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
