<template>
    <section>
        this is index index
        {{counter}}
        ppppqqqq
        0000
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
    }
}

</script>