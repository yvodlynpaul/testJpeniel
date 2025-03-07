<template>
    <div>
        <h2>Questionnaires disponibles</h2>
        <button @click="fetchQuestionnaires">Charger les questionnaires</button>

        <ul v-if="questionnaires.length">
            <li v-for="questionnaire in questionnaires" :key="questionnaire.id">
                {{ questionnaire.title }}
            </li>
        </ul>
        <p v-else>Aucun questionnaire disponible.</p>
    </div>
</template>

<script>
import { useQuestionnaireStore } from '@/stores/questionnaire';

export default {
    props: ['eventId'],
    setup(props) {
        const questionnaireStore = useQuestionnaireStore();

        const fetchQuestionnaires = async () => {
            await questionnaireStore.fetchQuestionnaires(props.eventId);
        };

        return {
            fetchQuestionnaires,
            questionnaires: questionnaireStore.questionnaires,
        };
    },
};
</script>
