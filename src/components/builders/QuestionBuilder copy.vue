<script>
import QuestionField from './QuestionField.vue';
import { useAuthStore } from '@/stores/auth';
import axios from 'axios';

export default {
    components: { QuestionField },
    data() {
        return {
            newQuestion: {
                label: '',
                type: 'text',
                options: []
            },
            questions: [],
            selectedEventId: null,
        };
    },
    methods: {
        // Ajouter une question
        async addQuestion() {
            if (this.newQuestion.label.trim() !== '') {
                // Ajouter une copie de la nouvelle question
                this.questions.push({ ...this.newQuestion, options: [...this.newQuestion.options] });
                // Réinitialiser la nouvelle question après ajout
                this.newQuestion = { label: '', type: 'text', options: [] };
            }
        },

        // Ajouter une option
        addOption() {
            this.newQuestion.options.push('');
        },

        // Supprimer une option
        removeOption(index) {
            this.newQuestion.options.splice(index, 1);
        },

        // Supprimer une question
        deleteQuestion(index) {
            this.questions.splice(index, 1);
        },
        async sendQuestionnaire() {
            if (!this.selectedEventId || this.questions.length === 0) {
                alert("Veuillez sélectionner un événement et ajouter des questions.");
                return;
            }
            try {
                const authStore = useAuthStore(); // Récupération du token
                const response = await axios.post(
                    `https://jpenielevent.onrender.com/events/${this.selectedEventId}/questionnaire`,
                    { questions: this.questions },
                    { headers: { Authorization: `Bearer ${authStore.token}` } }
                );
                alert("Questionnaire envoyé avec succès !");
            } catch (error) {
                console.error("Erreur lors de l'envoi du questionnaire :", error);
                alert("Une erreur s'est produite. Veuillez réessayer.");
            }
        }
    }
};
</script>

<template>
    <div>
        <h2>Créer un Questionnaire</h2>

        <!-- Sélection d'un événement -->
        <div>
            <label for="event">Choisir un événement :</label>
            <select id="event" v-model="selectedEventId">
                <option disabled value="">-- Sélectionnez un événement --</option>
                <option value="1">Événement 1</option>
                <option value="2">Événement 2</option>
                <!-- Les options peuvent être générées dynamiquement à partir de l'API -->
            </select>
        </div>

        <!-- Formulaire pour ajouter une nouvelle question -->
        <div>
            <input v-model="newQuestion.label" placeholder="Entrez la question" required />
            <select v-model="newQuestion.type">
                <option value="text">Texte</option>
                <option value="checkbox">Case à cocher</option>
                <option value="radio">Boutons radio</option>
            </select>

            <!-- Options supplémentaires pour Checkbox et Radio -->
            <div v-if="newQuestion.type === 'checkbox' || newQuestion.type === 'radio'">
                <div v-for="(option, index) in newQuestion.options" :key="index">
                    <input v-model="newQuestion.options[index]" placeholder="Entrez une option" />
                    <button @click="removeOption(index)">Supprimer l'option</button>
                </div>
                <button @click="addOption">Ajouter une option</button>
            </div>

            <button @click="addQuestion" class="mt-30px d-flex justify-content-center">Ajouter la question</button>
        </div>

        <!-- Afficher la liste des questions ajoutées -->
        <div v-for="(question, index) in questions" :key="index">
            <question-field :question="question" @delete="deleteQuestion(index)" />
        </div>

         <!-- Bouton pour envoyer le questionnaire -->
         <button @click="sendQuestionnaire" class="btn btn-primary mt-3">Envoyer le questionnaire</button>
    </div>
</template>