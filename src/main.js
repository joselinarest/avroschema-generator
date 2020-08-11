import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import VueCodemirror from 'vue-codemirror'
import VueClipboard from 'vue-clipboard2'
import VueMeta from 'vue-meta'
import router from './router';
import VueCodeHighlight from "vue-code-highlight";


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'

// import base style
import 'codemirror/lib/codemirror.css'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueCodemirror)

VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)

Vue.use(require('vue-script2'))

Vue.use(VueMeta, {
    // optional pluginOptions
    refreshOnceOnNavigation: true
})

Vue.use(VueCodeHighlight);

new Vue({
    router,
 render: h => h(App),
}).$mount('#app')
