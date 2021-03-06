# vue-multi-page-template

## BASEPATH

考虑到多页面之前的跳转问题，对前端注入了一个全局变量 *BASEPATH* ,它本质上是config/index.js 的assetsPublicPath配置项。

并且在 src/main.js 中，这一变量被挂载到了Vue的原型对象上，方便在模板上直接引用

这样，放在static目录下的文件可以这样访问：

```html
<img :src="BASEPATH + 'static/img/us.jpg'">
```

## style中引用assets

在vue文件的style中可以这样写：

```css
.hover-img{
    width:300px;
    height:400px;
    background-image:url("~@/assets/img/1.jpg");
    background-repeat:no-repeat;
    background-position:center;
}
```  

这样webpack就会找到 src/assets/img/1.jpg 了

## route

类似与vue-router的参数设计，我在 src/widget/vue-url.js 中提供一个插件，使用这个插件后就可以通过```$route```访问到路由信息对象、通过```$router```跳转页面：

```javascript
this.$router.push({
    path:"goods/list",  // .html可写可不写
    query:{
        a:1,
        b:["c","d"],
    },                  // query参数
});
```