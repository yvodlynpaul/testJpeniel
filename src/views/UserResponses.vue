<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const responses = ref([]);
const loading = ref(true);
const error = ref(null);

// Fonction pour récupérer les réponses avec les informations de l'utilisateur
const fetchResponses = async () => {
    try {
        const response = await axios.get(
            `https://jpenielevent.onrender.com/questionnaire/1/answers`, // Remplacez par le bon endpoint
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        );

        responses.value = response.data;
        console.log("Réponses récupérées :", responses.value);
    } catch (err) {
        error.value = err.response?.data?.detail || err.message;
        console.error("Erreur lors de la récupération des réponses :", error.value);
    } finally {
        loading.value = false;
    }
};

// Charger les réponses au montage du composant
onMounted(() => {
    fetchResponses();
});
</script>

<template>
    <div>
        <h2>Réponses des utilisateurs</h2>
        <div v-if="loading">
            <p>Chargement des réponses...</p>
        </div>
        <div v-else-if="error">
            <p class="text-red">Erreur : {{ error }}</p>
        </div>
        <div v-else>
            <div v-if="responses.length === 0">
                <p>Aucune réponse trouvée.</p>
            </div>
            <div v-else>
                <div v-for="response in responses" :key="response.id" class="response-item">
                    <h3>Utilisateur : {{ response.user.first_name }} {{ response.user.last_name }}</h3>
                    <p>Email : {{ response.user.email }}</p>
                    <h4>Réponses :</h4>
                    <ul>
                        <li v-for="answer in response.answers" :key="answer.question_id">
                            <strong>Question {{ answer.question_id }} :</strong> {{ answer.answer }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.response-item {
    margin-bottom: 20px;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
}

.text-red {
    color: red;
}
</style>