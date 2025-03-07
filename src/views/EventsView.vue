<script setup>
import EventListings from '@/components/events/EventListings.vue';
import PageTitle from '@/components/layout/PageTitle.vue';


</script>

<template>
    <!-- <PageTitle title="Listes des évènement" subTitle="Évènements"  /> -->
    <section>
        <!-- <div class="container">
            <h1>Salut à tous</h1>
        </div> -->

        <EventListings />
    </section>
</template>

<style scoped>
section {
    background-color: #f3f3f3;
}
</style>