<template>
    <section class="red">
        this is index index
        {{counter}}
        ppppqqqq
        0000

        <!-- <img src="/static/img/us.jpg"> -->
        1
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