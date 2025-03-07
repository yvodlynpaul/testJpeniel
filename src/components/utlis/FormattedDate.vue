<script setup>
import { computed } from 'vue';

// Define the props for the component
const props = defineProps({
    date: {
        type: String,
        required: true,
    },
    texte: {
        type: String,
        default: ''
    }
});

// Computed property to format the date
const formattedDate = computed(() => {
    if (!props.date) return '';
    const date = new Date(props.date);
    return new Intl.DateTimeFormat('fr-CA', { day: '2-digit', month: 'long', year: 'numeric' }).format(date);
});
</script>

<template>
    {{ texte }} {{ formattedDate }}
</template>