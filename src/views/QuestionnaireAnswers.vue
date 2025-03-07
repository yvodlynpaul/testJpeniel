<!-- src/views/AnswersView.vue -->
<template>
    <div>
        <PageTitle title="Réponses au Questionnaire" />
        <div v-if="loading">Chargement en cours...</div>
        <div v-else-if="error">{{ error }}</div>
        <div v-else>
            <h2>Réponses</h2>
            <ul>
                <li v-for="answer in answers" :key="answer.id">
                    <strong>Question ID:</strong> {{ answer.question_id }} <br />
                    <strong>Réponse:</strong> {{ answer.answer }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useQuestionnaireStore } from "../stores/questionnaire";
import PageTitle from "@/components/layout/PageTitle.vue";

const questionnaireStore = useQuestionnaireStore();
const answers = ref([]);
const loading = ref(false);
const error = ref(null);

onMounted(async () => {
    loading.value = true;
    try {
        await questionnaireStore.fetchAnswers();
        answers.value = questionnaireStore.answers;
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
});
</script>