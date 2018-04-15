<template>
    <div class="hover-img"></div>
</template>

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
