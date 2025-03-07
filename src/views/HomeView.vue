<script setup>
import EventListings from '@/components/events/EventListings.vue';
import EventSchedule from '@/components/events/EventSchedule.vue';
import Gallery from '@/components/layout/Gallery.vue';
import Hero from '@/components/layout/Hero.vue';
import HomeAbout from '@/components/layout/HomeAbout.vue';


</script>

<template>
    <Hero />
    <HomeAbout />
    
    <!-- <EventListings :limit="3"/> -->
     <EventSchedule />
    <!-- <Gallery /> -->
</template>