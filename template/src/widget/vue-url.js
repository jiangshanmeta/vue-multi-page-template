import parse_url from "locutus/php/url/parse_url";
import qs from "qs";

let route = parse_url(window.location.href);

if(!route.query){
    route.query = {};
}else{
    route.query = qs.parse(route.query);
}

if(route.hasOwnProperty('fragment')){
    route.hash = route.fragment;
}else{
    route.hash = '';
}
delete route.fragment;

Object.freeze(route);

const router = {
    push(obj){
        let path = obj.path;
        if(!path){
            console && console.warn("path是必传参数");
            return;
        }
        if(!path.endsWith(".html")){
            path += '.html';
        }

        if(obj.query){
            path = path + '?' + qs.stringify(obj.query);
        }

        window.location.href = BASEPATH + path;
    }
};

Object.freeze(router)

export default{
    install(Vue){
        Object.defineProperty(Vue.prototype,'$route',{
            get(){
                return route;
            },
        });

        Object.defineProperty(Vue.prototype,'$router',{
            value:router,
        });

    },
}