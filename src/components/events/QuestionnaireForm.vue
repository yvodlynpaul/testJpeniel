<!-- <template>
    <div>
        <h3>Ajouter un questionnaire</h3>
        <input type="text" v-model="questionnaire.title" placeholder="Titre du questionnaire" />
        <h4>Questions</h4>
        <div v-for="(question, index) in questionnaire.questions" :key="index">
            <input type="text" v-model="question.name" placeholder="Nom de la question" />
            <button @click="removeQuestion(index)">Supprimer</button>
        </div>
        <button @click="addQuestion">Ajouter une question</button>
        <button @click="submitQuestionnaire">Soumettre le questionnaire</button>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import axios from 'axios';
import { useAuthStore } from '../../stores/auth';

// Récupération du store d'authentification
const authStore = useAuthStore();

// Formulaire de questionnaire réactif
const questionnaire = reactive({
    title: '',
    questions: []
});

// Ajouter une question vide
const addQuestion = () => {
    questionnaire.questions.push({ name: '' });
};

// Supprimer une question
const removeQuestion = (index) => {
    questionnaire.questions.splice(index, 1);
};

// Soumettre le questionnaire au backend
const submitQuestionnaire = async () => {
    try {
        console.log("Token utilisé :", authStore.token);
        console.log("Payload envoyé :", questionnaire);

        const response = await axios.post(
            'https://jpenielevent.onrender.com/questionnaires/create/',
            {
                title: questionnaire.title,
                questions: questionnaire.questions.map((q) => ({ name: q.name }))
            },
            {
                headers: {
                    Authorization: `Bearer ${authStore.token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('Questionnaire créé avec succès:', response.data);
    } catch (error) {
        console.error('Erreur lors de la création du questionnaire:', error.response ? error.response.data : error);
    }
};

</script> -->