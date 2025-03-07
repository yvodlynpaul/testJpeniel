<template>
    <div>
        <h1>Gérer l'Événement</h1>

        <label for="event">Sélectionnez un événement :</label>
        <select id="event" v-model="selectedEventId">
            <option value="" disabled selected>Choisir un événement</option>
            <option v-for="event in events" :key="event.id" :value="event.id">
                {{ event.name }}
            </option>
        </select>

        
    </div>
</template>

<script>


export default {
    data() {
        return {
            selectedEventId: null,
             // Chargez les événements dynamiquement si nécessaire
        };
    },
};
</script>
