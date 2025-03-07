<script setup>
import { useAuthStore } from '../../stores/auth';
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import FormattedDate from '../utlis/FormattedDate.vue';
import FormattedTime from '../utlis/FormattedTime.vue';

// Accès au store d'authentification
const authStore = useAuthStore();
const userRole = computed(() => authStore.userRole);

defineProps({
    limit: Number,
    showButton: {
        type: Boolean,
        default: false
    },
});

const events = ref([]);
const loading = ref(true);
const errorMessage = ref('');

// Récupérer les données des événements
const fetchEventData = async () => {
    try {
        const response = await axios.get('https://jpenielevent.onrender.com/events/');
        events.value = response.data;
        // events.value.forEach(event => {
        //     console.log("Event start_date:", event.start_date);
        //     console.log("Parsed Date:", new Date(event.start_date));
        //     console.log("Is future event:", new Date(event.start_date) >= new Date());
        // });
    } catch (error) {
        console.error('Error fetching the event:', error);
        errorMessage.value = 'Failed to fetch event data.';
    } finally {
        loading.value = false;
    }
};

// Trier et prendre les 3 événements les plus proches
const upcomingEvents = computed(() => {
    return events.value
        .filter(event => new Date(event.start_date) >= new Date()) // Filtrer les événements futurs
        .sort((a, b) => new Date(a.start_date) - new Date(b.start_date)) // Trier par date croissante
        .slice(0, 3); // Prendre les 3 premiers
});



onMounted(() => {
    fetchEventData().then(() => {
        console.log("Fetched events:", events.value); // Vérifiez les événements récupérés
    });
});
</script>

<template>

    <section
        class="p-0 bg-black border-bottom border-color-transparent-white-very-light background-position-left-bottom background-no-repeat overflow-hidden"
        style="background-image: url('images/demo-conference-schedule-bg.png')">
        <div class="container-fluid">
            <div class="row justify-content-center appear anime-child anime-complete"
                data-anime="{ &quot;el&quot;: &quot;childs&quot;, &quot;translateX&quot;: [50, 0], &quot;opacity&quot;: [0,1], &quot;duration&quot;: 1200, &quot;delay&quot;: 0, &quot;staggervalue&quot;: 150, &quot;easing&quot;: &quot;easeOutQuad&quot; }">
                <!-- start features box item -->
                <div class="col-xl-3 p-0" style="">
                    <div
                        class="ps-20 pe-20 pt-25 pb-25 xxl-ps-15 xxl-pe-15 lg-p-7 sm-p-40px overflow-hidden h-100 text-center text-xl-start border-top border-end border-color-transparent-white-very-light">
                        <h2 class="alt-font fw-500 text-white ls-minus-2px"><span
                                class="w-20px h-4px d-inline-block bg-base-color me-10px"></span>Événements à venir</h2>
                        <p class="text-white opacity-7 mb-35px lg-w-50 md-w-70 sm-w-100 mx-auto mx-xl-auto">Découvrez
                            nos événements à venir et préparez-vous à des moments mémorables!</p>
                        <router-link to="/events"
                            class="btn btn-large btn-base-color btn-hover-animation btn-round-edge btn-box-shadow align-self-center">
                            <span>
                                <span class="btn-text">Voir les évènements</span>
                                <span class="btn-icon"><i class="fa-solid fa-arrow-right"></i></span>
                            </span>
                        </router-link>
                    </div>
                </div>
                <!-- end features box item -->
                <!-- start features box item -->
                <div class="col-xl-3 col-md-4 event-style-01 p-0" style="" v-for="(event, index) in upcomingEvents"
                    :key="event.id">
                    <div
                        class="bg-black hover-box will-change-inherit dark-hover feature-box ps-19 pe-19 pt-22 pb-27 md-p-8 md-pb-25 sm-pb-50px overflow-hidden h-100 text-center text-md-start border-top border-end border-color-transparent-white-very-light">
                        <div class="feature-box-content w-100 lg-mb-5 last-paragraph-no-margin">
                            <div class="text-white fs-22 alt-font fw-500 mb-20px">
                                <FormattedDate :date="event.start_date" />
                            </div>

                            <p class="text-white opacity-7">{{ event.title }}<br>
                                <FormattedTime :isoDate="event.start_date" />
                            </p>
                            <div
                                class="divider-style-03 mb-20px divider-style-03-01 border-color-transparent-white-very-light">
                            </div>
                            <!-- <p class="text-white opacity-7">Sociology - Herman miller<br>02:00 PM to 04:30 PM</p> -->
                            <p class="text-white opacity-7">{{ event.location }}</p>
                            <div
                                class="divider-style-03 mb-20px divider-style-03-01 border-color-transparent-white-very-light">
                            </div>
                            <p class="text-white opacity-7">Prix:
                                {{ event.subscription_fees <= 0 ? "Évènement gratuit" : event.subscription_fees + " $" }}
                            </p>
                            <div class="pt-6">
                                <router-link :to="'/events/' + event.id"
                                    class="btn btn-sm btn-base-color btn-hover-animation btn-round-edge btn-box-shadow align-self-center px-3">
                                    <span>
                                        <span class="btn-text">Afficher les détails</span>
                                        <span class="btn-icon"><i class="fa-solid fa-arrow-right"></i></span>
                                    </span>
                                </router-link>
                            </div>

                            <span
                                class="number fs-120 ls-minus-5px fw-500 text-outline text-outline-width-2px text-outline-color-base-color opacity-7 alt-font position-absolute bottom-minus-50px sm-bottom-minus-40px left-0px ps-20 sm-ps-0 sm-right-0px sm-left-0px">0{{ index + 1 }}</span>
                        </div>
                        <div class="feature-box-overlay bg-base-color"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
