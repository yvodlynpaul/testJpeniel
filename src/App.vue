<script setup>
import Footer from "./components/layout/Footer.vue";
import Header from "./components/layout/Header.vue"

</script>

<template>
    <Header v-if="!$route.meta.hideHeaderFooter"/>
    <!--v-if="!$route.meta.hideHeaderFooter"  -->
    <RouterView />
    <Footer v-if="!$route.meta.hideHeaderFooter"/>
</template>
