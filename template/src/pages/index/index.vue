<template>
    <section>
        this is index index
        {{counter}}
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
        },200)
    }
}

</script>