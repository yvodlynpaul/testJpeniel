<script setup>
import { computed } from 'vue';

// Define the props for the component
const props = defineProps({
    isoDate: {
        type: String,
        required: true,
    },
    texte: {
        type: String,
        default: ''
    }
});

// Computed property to format the date
// const formattedDate = computed(() => {
//     if (!props.date) return '';
//     const date = new Date(props.date);
//     return new Intl.DateTimeFormat('fr-CA', { day: '2-digit', month: 'long', year: 'numeric' }).format(date);
// });
const formattedTime = computed(() => {
  const date = new Date(props.isoDate);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}h${minutes}`;
});
</script>

<template>
    {{ texte }} {{ formattedTime }}
</template>