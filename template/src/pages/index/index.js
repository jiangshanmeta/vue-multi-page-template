import Vue from 'vue'

import App from './index.vue'

new Vue({
    el:'#app',
    render(h){
        return h('App');
    },
    components:{
        App,
    },
})