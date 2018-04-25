<template>
    <section class="red">
        this is index index

        {{counter}}

        <img :src="BASEPATH + 'static/img/us.jpg'">

        <button @click="gotoList">
            跳转页面
        </button>
    </section>
</template>

<script>
export default{
    data(){
        return {
            counter:0,
        };
    },
    created(){
        setInterval(()=>{
            this.counter++;
        },1000)

        console.log(this.$route)
    },
    methods:{
        gotoList(){
            this.$router.push({
                path:"goods/list",
                query:{
                    a:1,
                    b:["c","d"],
                }
            });
        },
    }

}

</script>

<style scoped>
.red{
    color:red;
}

</style>