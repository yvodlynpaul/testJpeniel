<script setup>
import EventListings from '@/components/events/EventListings.vue';
import PageTitle from '@/components/layout/PageTitle.vue';
import { ref, onMounted, defineProps, computed } from 'vue';
import { useRoute, RouterLink, useRouter } from 'vue-router';
import axios from 'axios';
import { useToast } from 'vue-toast-notification';
import EventMap from '@/components/partials/EventMap.vue';


import defaultImage from '../assets/images/custom/sample-image.jpg';
import FormattedDate from '@/components/utlis/FormattedDate.vue';

const route = useRoute();
const router = useRouter();
const toast = useToast();
const myAdress = "9273 3e rue montreal quebec h1e 6p9"

const eventId = route.params.id;
// defineProps({
//     limit: Number,
//     showButton: {
//         type: Boolean,
//         default: false
//     }
// });
const props = defineProps({
    event: Object,
    required: true
});

// const toggleFullDescription = () => {
//     showFullDescription.value = !showFullDescription.value;
// }

// const truncatedDescription = computed(() => {
//     let description = props.event.description || ''; // Ensure description is defined
//     if (!showFullDescription.value) {
//         description = description.substring(0, 100) + '...';
//     }
//     return description;
// });


const events = ref([]);
const loading = ref(true);
const errorMessage = ref('');

const fullImageUrl = computed(() => {
    /*if (!events.value || !events.value.image) {
        return defaultImage; // Utiliser l'image par défaut si `events` ou `image` n'est pas défini
    }
    return `https://jpenielevent.onrender.com${events.value.image}`;*/
    if (!events.value || !events.value.image) {
        return defaultImage; // Utiliser l'image par défaut si `events` ou `image` n'est pas défini
    }
    return `https://jpenielevent.onrender.com${events.value.image}`;
});

const fetchEventData = async () => {
    try {
        const response = await axios.get(`https://jpenielevent.onrender.com/events/${eventId}`);
        events.value = response.data;
    } catch (error) {
        console.error('Error fetching the event:', error);
        errorMessage.value = 'Failed to fetch event data.';
    } finally {
        loading.value = false; // Set loading to false after fetching is complete
    }
};

onMounted(() => {
    fetchEventData();
})

</script>

<template>
    <!-- <PageTitle :title="events.title" subTitle="Évènements" /> -->

    <section class="pt-0 bg-extra-medium-gray">
        <div class="container pt-6 z-i-2 position-relative">
            <div class="row d-flex justify-content-between">
                <div class="col-lg-7">
                    <div class="row d-flex bg-light mb-5 round-edge-sm">
                        <div class="overflow-hidden">
                            <div class="image round-edge-sm">
                                <img :src="fullImageUrl" alt="" class="w-100 pt-4 px-2" loading="lazy">
                            </div>
                        </div>
                        <div class="p-30px md-p-30px text-left">
                            <h5 class="border-bottom border-color-dark-gray pb-5px">Description</h5>
                            <p>{{ events.description }}</p>
                        </div>
                    </div>
                    <div class="row  bg-light round-edge-sm">
                        <div class="col-lg-12 pt-20px pb-20px " style="">
                            <div class="row d-flex justify-content-between align-items-center">
                                <div class="col-md-7 text-left d-flex ">
                                    <span class="fw-600 text-dark-gra"><i class="feather icon-feather-tag me-2 text-base-color"></i>Mots
                                        clés:</span>
                                    <ul class="d-flex gap-2">
                                        <li>tag-1</li>
                                        <li>tag-2</li>
                                        <li>tag-3</li>
                                    </ul>
                                </div>
                                <div
                                    class="col-md-5 col-xl-4 col-lg-3 d-flex justify-content-center  justify-content-md-end">
                                    <span class="fw-600 text-dark-gra"><i class="feather icon-feather-share-2 me-2 text-base-color"></i>Partager</span>
                                    <ul class="d-flex">
                                        <li><a href=""><i class="feather icon-feather-facebook me-2 text-blue"></i></a></li>
                                        <li><a href=""><i class="feather icon-feather-x me-2 text-dark-gray"></i></a></li>
                                        <li><a href=""><i class="feather icon-feather-instagram me-2 text-instagram"></i></a></li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
                <div class="col-lg-4 p-0 ">
                    <div class="row d-flex pb-5">
                        <router-link :to="`/show-q/${eventId}`"
                            class="btn btn-large btn-round-edge btn-base-color btn-hover-animation btn-box-shadow me-25px">
                            <span>
                                <span class="btn-text">S'inscrire à l'événement</span><span class="btn-icon"><i
                                        class="feather icon-feather-log-in"></i></span>
                            </span>
                        </router-link>
                    </div>
                    <div class="row d-flex  bg-light pt-4 pb-3 round-edge-sm">
                        <div>
                            <h2 class="alt-font fs-5 fw-400 ls-minus-2px text-uppercase">Détails de l'événements</h2>

                            <div class="info">
                                <div class="col-lg-12 pt-20px pb-20px border-bottom border-color-transparent-white-light"
                                    style="">
                                    <div class="row justify-content-between align-items-center">
                                        <div class="col-md-4 text-left"><span class="fw-600 text-dark-gray">Date début
                                                :</span>
                                        </div>
                                        <div
                                            class="col-md-8 col-xl-7 col-lg-6 d-flex justify-content-center justify-content-md-start">
                                            <p class="text-medium-gray text-white-hover">
                                                <FormattedDate :date="events.start_date" />
                                            </p>
                                        </div>

                                    </div>
                                </div>
                                <div class="col-lg-12 pt-20px pb-20px border-bottom border-color-transparent-white-light"
                                    style="">
                                    <div class="row justify-content-between">
                                        <div class="col-md-4 text-left"><span class="fw-600 text-dark-gray">Date fin
                                                :</span>
                                        </div>
                                        <div
                                            class="col-md-8 col-xl-7 col-lg-6 d-flex justify-content-center justify-content-md-start">
                                            <p class="text-medium-gray text-white-hover">
                                                <FormattedDate :date="events.expiration_date" />
                                            </p>
                                        </div>

                                    </div>
                                </div>
                                <div class="col-lg-12 pt-20px pb-20px border-bottom border-color-transparent-white-light"
                                    style="">
                                    <div class="row justify-content-between">
                                        <div class="col-md-4 text-left"><span class="fw-600 text-dark-gray">Adresse
                                                :</span>
                                        </div>
                                        <div
                                            class="col-md-8 col-xl-7 col-lg-6 d-flex justify-content-center justify-content-md-start">
                                            <p class="text-medium-gray text-white-hover">{{ events.location }}</p>
                                        </div>

                                    </div>
                                </div>
                                <div class="col-lg-12 pt-20px pb-20px border-bottom border-color-transparent-white-light"
                                    style="">
                                    <div class="row justify-content-between">
                                        <div class="col-md-4 text-left"><span class="fw-600 text-dark-gray">Prix
                                                :</span>
                                        </div>
                                        <div
                                            class="col-md-8 col-xl-7 col-lg-6 d-flex justify-content-center justify-content-md-start">
                                            <p class="text-medium-gray text-white-hover">
                                                {{ events.subscription_fees <= 0 ? "Évènement gratuit" : events.subscription_fees + " $" }}
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="pt-60px">
                            <div class="col-md-4 text-left pb-1"><span class="fw-600 text-dark-gray">Map:</span>
                            </div>
                            <EventMap :address="myAdress" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
/* Fixer la taille de l'image */
.image img {
    width: 100%;
    height: 500px;
    object-fit: cover; 
    border-radius: 6px; 
}

/* Si vous voulez que l'image soit responsive tout en gardant une taille fixe sur les petits écrans */
@media (max-width: 768px) {
    .image img {
        height: 300px;
    }
}
</style>