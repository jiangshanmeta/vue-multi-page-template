<template>
    <section>
        this is  good list

        <div class="hover-img"></div>

        <a :href="BASEPATH + 'index.html'">回到主页</a>
    </section>
</template>

<script>
export default{
    data(){
        return {
            BASEPATH:BASEPATH,
        }
    },
}
</script>

<style scoped>
.hover-img{
    width:300px;
    height:400px;
    background-image:url("~@/assets/img/1.jpg");
    background-repeat:no-repeat;
    background-position:center;
}
.hover-img:hover{
    background-image:url("~@/assets/img/2.jpg");
}

</style>