<script setup>
import { ref } from 'vue';
import QuestionField from './QuestionField.vue';
import { useAuthStore } from '@/stores/auth';
import axios from 'axios';

const newQuestion = ref({
    label: '',
    type: 'text',
    options: []
});
const questionnaireTitle = ref("");
const questions = ref([]);
const selectedEventId = ref(null);
const events = ref([]);

const fetchEvents = async () => {
    try {
        const authStore = useAuthStore();
        const response = await axios.get(
            `https://jpenielevent.onrender.com/events/`,
            { headers: { Authorization: `Bearer ${authStore.token}` } }
        );
        events.value = response.data.filter(event =>
            event.status === "Active" && event.questionnaires.length === 0
        );
        console.log(events.value);
    } catch (error) {
        console.error("Erreur lors de la récupération des événements :", error);
        alert("Impossible de charger les événements. Veuillez réessayer.");
    }
};

const addQuestion = () => {
    if (newQuestion.value.label.trim() !== '') {
        questions.value.push({ ...newQuestion.value, options: [...newQuestion.value.options] });
        newQuestion.value = { label: '', type: 'text', options: [] };
    }
};

const addOption = () => {
    newQuestion.value.options.push({ name: '' });
};

const removeOption = (index) => {
    newQuestion.value.options.splice(index, 1);
};

const deleteQuestion = (index) => {
    questions.value.splice(index, 1);
};

const sendQuestionnaire = async () => {
    if (!selectedEventId.value || questions.value.length === 0) {
        alert("Veuillez sélectionner un événement et ajouter des questions.");
        return;
    }

    try {
        const authStore = useAuthStore();
        const payload = {
            title: questionnaireTitle.value || "Titre du questionnaire par défaut",
            questions: questions.value.map(q => ({
                name: q.label,
                answer_type: mapAnswerType(q.type),
                options: q.type === 'checkbox' || q.type === 'radio' ? q.options : []
            }))
        };

        console.log("Payload envoyé :", JSON.stringify(payload, null, 2));
        const response = await axios.post(
            `https://jpenielevent.onrender.com/events/${selectedEventId.value}/questionnaire`,
            payload,
            { headers: { Authorization: `Bearer ${authStore.token}` } }
        );

        alert("Questionnaire envoyé avec succès !");
        console.log(response.data);
    } catch (error) {
        console.error("Erreur lors de l'envoi du questionnaire :", error.response?.data || error);
        alert("Une erreur s'est produite. Veuillez vérifier les données et réessayer.");
    }
};

const mapAnswerType = (type) => {
    const typeMapping = {
        text: "Text",
        checkbox: "Checkbox",
        radio: "Radio"
    };
    return typeMapping[type] || type;
};

fetchEvents();
</script>

<template>
    <div class="question-builder">
        <h2>Créer un Questionnaire</h2>

        <div class="form-group">
            <label for="event">Choisir un événement :</label>
            <select id="event" v-model="selectedEventId" class="form-select">
                <option disabled value="">-- Sélectionnez un événement --</option>
                <option v-for="event in events" :key="event.id" :value="event.id">
                    {{ event.title }}
                </option>
            </select>
        </div>

        <div class="form-group">
            <input v-model="questionnaireTitle" placeholder="Titre du questionnaire" required class="form-input" />
        </div>

        <div class="form-group">
            <input v-model="newQuestion.label" placeholder="Entrez la question" required class="form-input" />
            <select v-model="newQuestion.type" class="form-select">
                <option value="text">Texte</option>
                <option value="checkbox">Case à cocher</option>
                <option value="radio">Boutons radio</option>
            </select>

            <div v-if="newQuestion.type === 'checkbox' || newQuestion.type === 'radio'" class="options-group">
                <div v-for="(option, index) in newQuestion.options" :key="index" class="option">
                    <input v-model="option.name" placeholder="Entrez une option" class="form-input" />
                    <button @click="removeOption(index)" class="delete-option-button">Supprimer</button>
                </div>
                <button @click="addOption" class="add-option-button">Ajouter une option</button>
            </div>

            <button @click="addQuestion" class="add-question-button">Ajouter la question</button>
        </div>

        <div v-for="(question, index) in questions" :key="index">
            <question-field :question="question" @delete="deleteQuestion(index)" />
        </div>

        <button @click="sendQuestionnaire" class="submit-button">Envoyer le questionnaire</button>
    </div>
</template>

<style scoped>
.question-builder {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
    margin-bottom: 20px;
}

.form-input,
.form-select {
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
}

.options-group {
    margin-top: 10px;
}

.option {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.delete-option-button {
    margin-left: 10px;
    padding: 5px 10px;
    background-color: #ff4d4d;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.delete-option-button:hover {
    background-color: #cc0000;
}

.add-option-button,
.add-question-button,
.submit-button {
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.add-option-button:hover,
.add-question-button:hover,
.submit-button:hover {
    background-color: #45a049;
}

.submit-button {
    background-color: #0078d4;
}

.submit-button:hover {
    background-color: #005bb5;
}
</style>