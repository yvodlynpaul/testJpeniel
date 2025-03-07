<script setup>
import { useAuthStore } from '../../stores/auth';
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import EventListing from './EventListing.vue';

// get access the auth store
const authStore = useAuthStore();

// Create a computed property for userRole from the store
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

const fetchEventData = async () => {
    try {
        const response = await axios.get('https://jpenielevent.onrender.com/events/');
        events.value = response.data;
    } catch (error) {
        console.error('Error fetching the event:', error);
        errorMessage.value = 'Failed to fetch event data.';
    } finally {
        loading.value = false; // Set loading to false after fetching is complete
    }
};
const handleEventDeleted = (eventId) => {
    events.value = events.value.filter(event => event.id !== eventId); // Filtrer l'événement supprimé
};

onMounted(() => {
    fetchEventData();
})
</script>

<template>
    <div class="container events">
        <div class="row d-flex">
            <EventListing v-for="event in events.slice(0, limit || events.length)" :key="event.id" :event="event"
                :role="userRole"  @event-deleted="handleEventDeleted"/>
        </div>
    </div>
</template>