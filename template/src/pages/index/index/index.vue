<template>
    <section class="red">
        this is index index
        {{counter}}
        ppppqqqq
        0000

        <img :src="BASEPATH + 'static/img/us.jpg'">
        1

        <a :href="BASEPATH + 'goods/list.html'">
            跳转页面
        </a>
    </section>
</template>

<script>
export default{
    data(){
        return {
            counter:0,
            BASEPATH:BASEPATH,
        };
    },
    created(){
        console.log(backendUrl)
        setInterval(()=>{
            this.counter++;
        },1000)
    }
}

</script>

<style scoped>
.red{
    color:red;
}

</style>