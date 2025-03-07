<script setup>
import { defineProps, ref, computed } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import axios from 'axios';
import { useToast } from 'vue-toast-notification';

// Import the default image
import defaultImage from '../../assets/images/custom/bg-hero-2.png';
import FormattedDate from '../utlis/FormattedDate.vue';


const route = useRoute();
const router = useRouter();
const toast = useToast();

const authStore = useAuthStore();
const userRole = computed(() => authStore.userRole);

const props = defineProps({
    event: Object,
    role: String
});

const emit = defineEmits(['event-deleted']); // Déclarer l'événement

const showFullDescription = ref(false);

const toggleFullDescription = () => {
    showFullDescription.value = !showFullDescription.value;
}

const fullImageUrl = computed(() => {
    const imagePath = props.event.image; // Assure-toi que tu utilises la bonne clé
    return imagePath ? `https://jpenielevent.onrender.com${imagePath}` : defaultImage;
});
/* const fullImageUrl = computed(() => {
    // Get the first image path from the event's images array
    const imagePath = props.event.images?.[0];
    // Check if the image path is valid; if not, use the default image
    return imagePath ? `https://jpenielevent.onrender.com${imagePath}` : defaultImage;
}); */

const truncatedDescription = computed(() => {
    let description = props.event.description || ''; // Ensure description is defined
    if (!showFullDescription.value) {
        description = description.substring(0, 100) + '...';
    }
    return description;
});

const formattedDateFormat = computed(() => {
    // if (!this.event.start_date) return '';
    // const date = new Date(this.event.start_date);
    // return date.toLocaleDateString('fr-CA', {
    //     day: '2-digit',
    //     month: '2-digit',
    //     year: 'numeric'
    // });
    if (!props.event.start_date) return '';
    const date = new Date(props.event.start_date);
    return new Intl.DateTimeFormat('fr-CA', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
});

const deleteEvent = async () => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
        try {
            const response = await axios.delete(`https://jpenielevent.onrender.com/events/delete/${props.event.id}`);
            // console.log(response); // Afficher la réponse pour déboguer

            if (response.status >= 200 && response.status < 300) {
                emit('event-deleted', props.event.id); // Émettre l'événement
                toast.success('Event deleted successfully');
            } else {
                console.error('Erreur lors de la suppression de l\'événement:', response.data);
            }
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'événement:', error);
        }
    }
};
// const deleteEvent = async () => {
//     try {
//         await axios.delete(`https://jpenielevent.onrender.com/events/delete/${props.event.id}`);
//         toast.success('Event deleted successfully');
//         router.push('/events')
//     } catch (error) {
//         console.log('Error deleting the event:', error );
//         toast.error('Event not deleted');
//     }
// }
</script>

<template>
    <div class="event-card pt-4 d-flex flex-wrap">
        <div
            class="col-12 col-lg-3 col-md-6 cover-background background-position-right-top sm-h-250px xs-h-250px appear anime-complete image">
            <img class="w-100" :src="fullImageUrl" alt="">
        </div>
        <div class="content col-12 col-lg-9 col-md-6 p-4 md-p-30px position-relative appear anime-child anime-complete bg-white"
            data-anime="{ &quot;el&quot;: &quot;childs&quot;, &quot;translateY&quot;: [-15, 0], &quot;opacity&quot;: [0,1], &quot;duration&quot;: 300, &quot;delay&quot;: 0, &quot;staggervalue&quot;: 100, &quot;easing&quot;: &quot;easeOutQuad&quot; }">
            <div class="d-flex justify-content-between">
                <div class="ls-2px text-uppercase text-dark-gray fw-500 lh-22 mb-10px d-block" style="">
                    <h2 class="alt-font fw-700 text-base-color ls-minus-1px mb-20px" style="">{{ event.title }}</h2>
                </div>
                <div class="d-inline-block border-2 text-base-color  d-flex flex-column">
                    <span class="fw-700 fs-24 d-flex justify-content-between">
                        <span>Prix:</span>
                        <span>{{ event.subscription_fees <= 0 ? "Gratuit" : event.subscription_fees + " $" }}</span>
                    </span>
                    <span class="fs-16 fw-600">
                        <span>Date: </span>
                        <span>{{ formattedDateFormat }}</span>
                    </span>
                </div>
            </div>

            <!-- <h2 class="alt-font fw-700 text-base-color ls-minus-1px mb-20px" style="">{{ event.title }}</h2> -->
            <p class="w-85 mb-30px lg-w-100" style="">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi
                deserunt ad harum consectetur, nisi obcaecati. {{ truncatedDescription }}</p>
            <!-- <span class="text-dark-gray fw-500 fs-19 lh-30 w-75 d-block mb-10px lg-w-100" style="">
                <FormattedDate :date="event.start_date" />
            </span> -->

            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <router-link :to="'/events/' + event.id"
                        class="btn btn-md btn-base-color btn-hover-animation btn-round-edge btn-box-shadow px-3">
                        <span>
                            <span class="btn-text fw-bold">Afficher les détails</span>
                            <span class="btn-icon"><i class="fa-solid fa-arrow-right"></i></span>
                        </span>
                    </router-link>
                </div>
                <div v-if="userRole === 'ADMIN'" class="d-flex">
                    <router-link :to="'/events/edit/' + event.id"
                        class="btn btn-md btn-dark-gray btn-hover-animation btn-round-edge btn-box-shadow mx-3">
                        <span>
                            <span class="btn-text fw-bold">Modifier</span>
                            <span class="btn-icon"><i class="fa-solid fa-arrow-right"></i></span>
                        </span>
                    </router-link>
                    <button @click="deleteEvent"
                        class="btn btn-md btn-light-medium-gray btn-hover-animation btn-round-edge btn-box-shadow">
                        <span>
                            <span class="btn-text text-light fw-bold">Supprimer</span>
                            <span class="btn-icon"><i class="fa-solid fa-arrow-right"></i></span>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.event-card .content {
    border-radius: 0 10px 10px 0;
}

.event-card img {
    border-radius: 10px 0 0 10px;
    width: 300px; /* Largeur fixe */
    height: 200px; /* Hauteur fixe */
    object-fit: cover; /* Pour s'assurer que l'image couvre la zone sans se déformer */
}

/* Si vous voulez que l'image soit responsive tout en gardant une taille fixe sur les petits écrans */
@media (max-width: 768px) {
    .event-card img {
        width: 100%; /* Largeur relative sur les petits écrans */
        height: auto; /* Hauteur automatique pour maintenir le ratio */
    }
}
</style>