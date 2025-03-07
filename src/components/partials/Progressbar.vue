<template>
    <div class="progress  bg-transparent alt-font fs-14 fw-500">
        <div class="progress-bar-title text-dark d-inline-block alt-font fs-14 ls-1px text-uppercase">Progress {{ value + 1 }}/{{ max + 1}} </div>
        <!-- <div class="progress-bar bg-gradient-emerald-blue-emerald-green m-0 appear" role="progressbar"
            aria-valuenow="90" aria-valuemin="0" aria-valuemax="100" aria-label="branding" style="width: 90%;">
            <span class="progress-bar-percent text-white">90%</span>
        </div> -->
        <progress :value="value" :max="max"/>
    </div>
</template>

<script setup>
defineProps({
    value: Number,
    max: Number
});
</script>

<!-- <template>
    <div class="progress bg-transparent alt-font fs-14 fw-500">
        
        <div class="progress-bar-title text-dark d-inline-block alt-font fs-14 ls-1px text-uppercase">
            Progress {{ value + 1 }}/{{ max + 1 }}
        </div>

        
        <div class="progress-bar bg-gradient-emerald-blue-emerald-green m-0 appear" role="progressbar"
            :aria-valuenow="progressPercentage" aria-valuemin="0" aria-valuemax="100" aria-label="progress"
            :style="{ width: progressPercentage + '%' }">
            <span class="progress-bar-percent text-white">{{ progressPercentage }}%</span>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    value: Number, // La valeur actuelle de progression (par exemple, étape actuelle)
    max: Number // La valeur maximale (par exemple, nombre total d'étapes ou de questions)
});

// Calcul du pourcentage
const progressPercentage = computed(() => {
    // if (max === 0) return 0; 
    return Math.round((props.value / props.max) * 100);
});
</script>

<style>

.progress-bar {
    transition: width 0.5s ease-in-out;
   
}
</style> -->