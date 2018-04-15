<template>
    <section>
        this is  good list

        <hover-img></hover-img>

        <a :href="BASEPATH + 'index.html'">回到主页</a>
    </section>
</template>

<script>
import hoverImg from "@/components/hover-img"

export default{
    components:{
        hoverImg
    },
    data(){
        return {
            
        }
    },
}
</script>

