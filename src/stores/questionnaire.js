// src/stores/questionnaire.js
import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from './auth'; // Si votre AuthStore gère les tokens

export const useQuestionnaireStore = defineStore('questionnaire', {
    state: () => ({
        questionnaires: [], // Stocker les questionnaires récupérés
    }),
    actions: {
        // Récupérer les questionnaires liés à un événement
        async fetchQuestionnaires(eventId) {
            try {
                const authStore = useAuthStore(); // Récupérer le token de l'auth store
                const response = await axios.get(
                    `https://jpenielevent.onrender.com/events/${eventId}/questionnaire`,
                    { headers: { Authorization: `Bearer ${authStore.token}` } }
                );
                this.questionnaires = response.data; // Stocker les données récupérées
            } catch (error) {
                console.error('Erreur lors de la récupération des questionnaires :', error);
            }
        },
        // Récupérer les réponses au questionnaire
        async fetchAnswers() {
            try {
                const authStore = useAuthStore();
                const response = await axios.get(
                    'https://jpenielevent.onrender.com/questionnaires/1/answers',
                    { headers: { Authorization: `Bearer ${authStore.token}` } }
                );
                this.answers = response.data;

                this.answers.forEach(answer => {
                    const question = this.questionnaires.flatMap(q => q.questions).find(q => q.id === answer.question_id);
                    if (question) {
                        answer.question_text = question.text;
                    }
                });
            } catch (error) {
                console.error('Erreur lors de la récupération des réponses :', error);
                if (error.response) {
                    console.error('Response data:', error.response.data);
                    console.error('Response status:', error.response.status);
                    console.error('Response headers:', error.response.headers);
                } else if (error.request) {
                    console.error('No response received:', error.request);
                } else {
                    console.error('Error setting up the request:', error.message);
                }
            }
        }
    },
});
