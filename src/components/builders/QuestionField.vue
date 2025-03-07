<!-- <template>
    <div class="question-field">
        <label>{{ question.label }}</label>

        <input v-if="question.type === 'text'" type="text" v-model="question.value" placeholder="Votre réponse ici" />

        <div v-if="question.type === 'checkbox'">
            <div v-for="(option, i) in question.options" :key="i">
                <input type="checkbox" :value="option" /> {{ option }}
            </div>
        </div>

        <div v-if="question.type === 'radio'">
            <div v-for="(option, i) in question.options" :key="i">
                <input type="radio" :value="option" name="radio-group" /> {{ option }}
            </div>
        </div>

        <button @click="$emit('delete')">Supprimer la question</button>
    </div>
</template>

<script>
export default {
    props: ['question']
};
</script> -->

<template>
    <div class="question-field">
        <label>{{ question.label }}</label>

        <!-- Champ texte -->
        <input v-if="question.type === 'text'" type="text" v-model="question.value" placeholder="Votre réponse ici"
            class="form-input" />

        <!-- Cases à cocher -->
        <div v-if="question.type === 'checkbox'" class="options-container">
            <div v-for="(option, i) in question.options" :key="i" class="option">
                <input type="checkbox" :value="option" class="form-checkbox" />
                <span>{{ option }}</span>
            </div>
        </div>

        <!-- Boutons radio -->
        <div v-if="question.type === 'radio'" class="options-container">
            <div v-for="(option, i) in question.options" :key="i" class="option">
                <input type="radio" :value="option" name="radio-group" class="form-radio" />
                <span>{{ option }}</span>
            </div>
        </div>

        <button @click="$emit('delete')" class="delete-button">Supprimer la question</button>
    </div>
</template>

<script setup>
defineProps(['question']);
</script>

<style scoped>
.question-field {
    margin-bottom: 20px;
    padding: 15px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background-color: #fff;
}

.form-input {
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
}

.options-container {
    margin-top: 10px;
}

.option {
    margin-bottom: 10px;
}

.form-checkbox,
.form-radio {
    margin-right: 10px;
}

.delete-button {
    margin-top: 10px;
    padding: 5px 10px;
    background-color: #ff4d4d;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.delete-button:hover {
    background-color: #cc0000;
}
</style>