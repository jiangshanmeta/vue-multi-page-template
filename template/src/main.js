import Vue from 'vue';
import VueConfig from "@/widget/vue-config";
import 'babel-polyfill';
import "@/assets/css/reset.css";

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