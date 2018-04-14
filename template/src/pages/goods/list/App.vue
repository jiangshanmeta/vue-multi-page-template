<template>
    <section>
        this is  good list

        <div class="hover-img"></div>

    </section>
</template>

<script>
export default{

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