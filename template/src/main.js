import Vue from 'vue';
import vueUrl from "@/widget/vue-url";
import VueConfig from "@/widget/vue-config";
import 'babel-polyfill';
import "@/assets/css/reset.css";

Vue.use(vueUrl);
Vue.use(VueConfig);

Vue.prototype.BASEPATH = BASEPATH;

function genVMByAppComponent(App){
    return new Vue({
        el:"#app",
        components:{
            App,
        },
        render(h){
            return h('App');
        },
    })
}

export default genVMByAppComponent;