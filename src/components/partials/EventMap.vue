<script setup>
import { ref, onMounted, watch } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const props = defineProps({
    address: {
        type: String,
        required: true,
    },
});

const mapContainer = ref(null);
let map = null;
let marker = null;

onMounted(() => {
    initMap();
});

watch(() => props.address, () => {
    updateMap();
});

const initMap = () => {
    map = L.map(mapContainer.value).setView([45.5759497, -73.5685163], 13); // Coordonnées par défaut (Paris)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
    }).addTo(map);
};

const updateMap = async () => {
    if (!props.address) return;

    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(props.address)}`);
        const data = await response.json();
        console.log(data);
        

        if (data.length > 0) {
            const { lat, lon } = data[0];
            map.setView([lat, lon], 13);

            if (marker) {
                marker.setLatLng([lat, lon]);
            } else {
                marker = L.marker([lat, lon]).addTo(map);
            }
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des coordonnées:', error);
    }
};
</script>

<template>
    <div ref="mapContainer" class="map-container"></div>
</template>

<style scoped>
.map-container {
    height: 400px;
    width: 100%;
}
</style>