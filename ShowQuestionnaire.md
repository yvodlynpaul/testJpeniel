<script setup>
import { computed, reactive, ref, onMounted } from "vue";
import { useRoute, useRouter } from 'vue-router';
import { useEventQuestionnaire } from "../stores/eventQuestionnaire";
import axios from "axios";
import PageTitle from "@/components/layout/PageTitle.vue";
// import Progressbar from "@/components/partials/Progressbar.vue";

const { questionnaire, error, loading, fetchQuestionnaire, questionnaireId } = useEventQuestionnaire();

const answers = reactive({});
const route = useRoute();
// const step = ref(0);
const eventId = route.params.eventId; // Exemple d'ID d'événement

fetchQuestionnaire(eventId);

// const totalQuestions = computed(() => {
//     return questionnaire.value
//         ? questionnaire.value.reduce((total, q) => total + q.questions.length, 0)
//         : 0;
// });
const saveDraft = () => {
    localStorage.setItem(`draft_${eventId}`, JSON.stringify(answers));
    alert("Brouillon sauvegardé !");
};


const loadDraft = () => {
    const draft = localStorage.getItem(`draft_${eventId}`);
    if (draft) {
        Object.assign(answers, JSON.parse(draft));
        alert("Brouillon chargé !");
    }
};

const selectSingleOption = (questionId, optionId) => {
    // Si answers[questionId] n'existe pas encore, initialisez-le comme un tableau vide
    if (!answers[questionId]) {
        answers[questionId] = [];
    }

    // Si l'option est déjà sélectionnée, on la retire du tableau
    if (answers[questionId].includes(optionId)) {
        answers[questionId] = answers[questionId].filter(id => id !== optionId);
    } else {
        // Sinon, on ajoute l'option au tableau
        answers[questionId].push(optionId);
    }
};



// const submitAnswers = async () => {
//     try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//             throw new Error("No authentication token found");
//         }

//         // Check if questionnaireId is defined
//         if (!questionnaireId.value) {
//             throw new Error("No questionnaire found for this event");
//         }

//         const formattedAnswers = Object.keys(answers).map(questionId => {
//     const question = questionnaire.value.flatMap(q => q.questions).find(q => q.id === parseInt(questionId));
//     return {
//         id: parseInt(questionId),
//         answer: question.answer_type === 'Checkbox' ? answers[questionId] : answers[questionId] // Pas besoin de [0] pour les réponses de type Text
//     };
// });

//         const response = await axios.post(
//             `https://jpenielevent.onrender.com/questionnaires/${questionnaireId.value}/submitanswer/`,
//             {
//                 questionnaire_id: questionnaireId.value,
//                 answers: formattedAnswers
//             },
//             {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             }
//         );

//         alert("Réponses soumises avec succès !");
//         console.log("Réponses soumises :", response.data);
//         localStorage.removeItem(`draft_${eventId}`);
//     } catch (err) {
//         console.error("Erreur lors de l'envoi des réponses :", err.response?.data?.detail || err.message);
//     }
// };



// const submitAnswers = async () => {
//     try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//             throw new Error("No authentication token found");
//         }

//         if (!questionnaireId.value) {
//             throw new Error("No questionnaire found for this event");
//         }

//         const formattedAnswers = [];

//         Object.keys(answers).forEach(questionId => {
//             const question = questionnaire.value.flatMap(q => q.questions).find(q => q.id === parseInt(questionId));

//             if (question.answer_type === 'Checkbox') {
//                 // Pour les Checkbox, envoyer une réponse distincte pour chaque option cochée
//                 answers[questionId].forEach(optionId => {
//                     formattedAnswers.push({
//                         id: parseInt(questionId),
//                         answer: optionId
//                     });
//                 });
//             } else {
//                 // Pour les autres types de questions, envoyer une seule réponse
//                 formattedAnswers.push({
//                     id: parseInt(questionId),
//                     answer: answers[questionId]
//                 });
//             }
//         });

//         const response = await axios.post(
//             `https://jpenielevent.onrender.com/questionnaires/${questionnaireId.value}/submitanswer/`,
//             {
//                 questionnaire_id: questionnaireId.value,
//                 answers: formattedAnswers
//             },
//             {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             }
//         );

//         alert("Réponses soumises avec succès !");
//         console.log("Réponses soumises :", response.data);
//         localStorage.removeItem(`draft_${eventId}`);
//     } catch (err) {
//         console.error("Erreur lors de l'envoi des réponses :", err.response?.data?.detail || err.message);
//     }
// };

//19:50
// const submitAnswers = async () => {
//     try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//             throw new Error("No authentication token found");
//         }

//         if (!questionnaireId.value) {
//             throw new Error("No questionnaire found for this event");
//         }

//         const formattedAnswers = [];

//         Object.keys(answers).forEach(questionId => {
//             const question = questionnaire.value.flatMap(q => q.questions).find(q => q.id === parseInt(questionId));

//             if (question.answer_type === 'Checkbox' || question.answer_type === 'Radio') {
//                 // Pour les Checkbox et Radio, vérifiez si answers[questionId] est un tableau
//                 if (Array.isArray(answers[questionId])) {
//                     const selectedOptions = answers[questionId].map(optionId => {
//                         const selectedOption = question.options.find(option => option.id === optionId);
//                         return selectedOption ? { name: selectedOption.name } : null;
//                     }).filter(option => option !== null); // Filtrer les options non trouvées

//                     formattedAnswers.push({
//                         id: parseInt(questionId),
//                         options: selectedOptions, // Envoyer les options sélectionnées sous forme de tableau
//                         answer: "" // Laisser vide pour les Checkbox/Radio
//                     });
//                 }
//             } else if (question.answer_type === 'Text') {
//                 // Pour les réponses de type Text, envoyer directement la valeur
//                 formattedAnswers.push({
//                     id: parseInt(questionId),
//                     options: [], // Laisser vide pour les Text
//                     answer: answers[questionId] // Envoyer la réponse textuelle
//                 });
//             }
//         });

//         const response = await axios.post(
//             `https://jpenielevent.onrender.com/questionnaires/${questionnaireId.value}/submitanswer/`,
//             {
//                 questionnaire_id: questionnaireId.value,
//                 answers: formattedAnswers
//             },
//             {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             }
//         );

//         alert("Réponses soumises avec succès !");
//         console.log("Réponses soumises :", response.data);
//         localStorage.removeItem(`draft_${eventId}`);
//     } catch (err) {
//         console.error("Erreur lors de l'envoi des réponses :", err.response?.data?.detail || err.message);
//     }
// };

const submitAnswers = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error("No authentication token found");
        }

        if (!questionnaireId.value) {
            throw new Error("No questionnaire found for this event");
        }

        const formattedAnswers = [];

        Object.keys(answers).forEach(questionId => {
            const question = questionnaire.value.flatMap(q => q.questions).find(q => q.id === parseInt(questionId));

            if (question.answer_type === 'Checkbox' || question.answer_type === 'Radio') {
                // Pour les Checkbox et Radio, vérifiez si answers[questionId] est un tableau
                if (Array.isArray(answers[questionId])) {
                    const selectedOptions = answers[questionId].map(optionId => {
                        const selectedOption = question.options.find(option => option.id === optionId);
                        return selectedOption ? { name: selectedOption.name } : null;
                    }).filter(option => option !== null); // Filtrer les options non trouvées

                    formattedAnswers.push({
                        id: parseInt(questionId),
                        options: selectedOptions, // Envoyer les options sélectionnées sous forme de tableau
                        answer: "" // Laisser vide pour les Checkbox/Radio
                    });
                }
            } else if (question.answer_type === 'Text') {
                // Pour les réponses de type Text, envoyer directement la valeur
                formattedAnswers.push({
                    id: parseInt(questionId),
                    options: [], // Laisser vide pour les Text
                    answer: answers[questionId] // Envoyer la réponse textuelle
                });
            }
        });

        const response = await axios.post(
            `https://jpenielevent.onrender.com/questionnaires/${questionnaireId.value}/submitanswer/`,
            {
                questionnaire_id: questionnaireId.value,
                answers: formattedAnswers
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        alert("Réponses soumises avec succès !");
        console.log("Réponses soumises :", response.data);
        localStorage.removeItem(`draft_${eventId}`);
    } catch (err) {
        console.error("Erreur lors de l'envoi des réponses :", err.response?.data?.detail || err.message);
    }
};

onMounted(() => {
    loadDraft();
});
</script>




<template>
    <!-- <PageTitle /> -->
    <section>
        <div class="form-container">
            <div class="form-header">
                <h3>Questionnaire</h3>
                <!-- <Progressbar :value="step" :max="totalQuestions" /> -->
            </div>
            <div v-if="loading" class="loading-message">
                <p>Chargement...</p>
            </div>
            <div v-else-if="error" class="error-message">
                <p>Erreur : {{ error }}</p>
            </div>
            <div v-else-if="questionnaire && questionnaire.length > 0" class="form-content">
                <form @submit.prevent="submitAnswers">
                    <div v-for="q in questionnaire" :key="q.id" class="question-group">
                        <h4>{{ q.title }}</h4>
                        <ul class="question-list">
                            <li v-for="question in q.questions" :key="question.id" class="question-item">
                                <label>{{ question.name }}</label>

                                <div v-if="question.answer_type === 'Text'" class="input-group">
                                    <input type="text" v-model="answers[question.id]" placeholder="Votre réponse ici" />
                                </div>

                                <div v-if="question.answer_type === 'Radio'" class="radio-group">
                                    <div v-for="option in question.options" :key="option.id" class="radio-option">
                                        <input type="radio" :name="`question-${question.id}`" :value="option.id"
                                            v-model="answers[question.id]" />
                                        <span>{{ option.name }}</span>
                                    </div>
                                </div>
                                <!-- <div v-if="question.answer_type === 'Checkbox'" class="checkbox-group">
                                <div v-for="option in question.options" :key="option.id" class="checkbox-option">
                                    <input type="checkbox" :value="option.id" v-model="answers[question.id]" />
                                    <span>{{ option.name }}</span>
                                </div>
                            </div> -->
                                <div v-if="question.answer_type === 'Checkbox'" class="checkbox-group">
                                    <div v-for="option in question.options" :key="option.id" class="checkbox-option">
                                        <input type="checkbox" :checked="answers[question.id]?.includes(option.id)"
                                            @click="selectSingleOption(question.id, option.id)" />
                                        <span>{{ option.name }}</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="form-actions">
                        <button type="submit" class="submit-button">Envoyer les réponses</button>
                        <button type="button" @click="saveDraft" class="draft-button">Sauvegarder en brouillon</button>
                    </div>
                </form>
            </div>
            <div v-else class="no-questions-message">
                <p>Aucune question trouvée.</p>
            </div>
        </div>
    </section>
</template>

<style scoped>
section {
    background: rgb(220, 220, 251);
    background: linear-gradient(156deg, rgba(220, 220, 251, 1) 0%, rgba(226, 252, 252, 1) 47%, rgba(254, 233, 253, 1) 100%);
    min-height: 100vh;
}

.form-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    /* background-color: #fff; */
    background: rgb(245, 239, 247);
    background: linear-gradient(0deg, rgba(245, 239, 247, 1) 0%, rgba(248, 255, 248, 1) 100%);
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-header {
    margin-bottom: 20px;
}

.form-header h3 {
    font-size: 24px;
    color: #333;
}

.loading-message,
.error-message,
.no-questions-message {
    text-align: center;
    padding: 20px;
    font-size: 18px;
    color: #666;
}

.form-content {
    margin-top: 20px;
}

.question-group {
    margin-bottom: 30px;
}

.question-group h4 {
    font-size: 20px;
    color: #444;
    margin-bottom: 15px;
}

.question-list {
    list-style: none;
    padding: 0;
}

.question-item {
    margin-bottom: 20px;
}

.question-item label {
    font-size: 16px;
    color: #555;
    margin-bottom: 10px;
    display: block;
}

.input-group input {
    width: 100%;
    padding: 4px;
    border: 2px solid #ffffff;
    border-radius: 4px;
    font-size: 16px;
}

.input-group input:focus {
    border-bottom: 2px solid var(--base-color);
}

.radio-group,
.checkbox-group {
    margin-top: 10px;
    padding-left: 20px;
    /* Ajout du padding à gauche */
}

.radio-option,
.checkbox-option {
    margin-bottom: 10px;
}

.radio-option input,
.checkbox-option input {
    margin-right: 10px;
}

.form-actions {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
}

.submit-button,
.draft-button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
}

.submit-button {
    background-color: #4CAF50;
    color: white;
}

.submit-button:hover {
    background-color: #45a049;
}

.draft-button {
    background-color: #f0ad4e;
    color: white;
}

.draft-button:hover {
    background-color: #ec971f;
}
</style>